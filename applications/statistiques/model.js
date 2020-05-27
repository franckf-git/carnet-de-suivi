'use strict'
const statistiques = require('./../../config/basededonnees/statistiques')
const { nettoyageTotal } = require('./../utils')
const logger = require('./../utils/logger')

exports.enregistrementInfos = async (infos) => {
  try {
    const {
      ip,
      remoteAddress,
      uuid,
      uuidStatsAnonym,
      doNotTrack,
      userAgent,
      language,
      pathname,
      width,
      height,
      orientation,
      duration
    } = infos
    const infosClean = {
      ip,
      remoteAddress,
      uuid: nettoyageTotal(uuid),
      uuidStatsAnonym: nettoyageTotal(uuidStatsAnonym),
      doNotTrack: nettoyageTotal(doNotTrack),
      userAgent: nettoyageTotal(userAgent),
      language: nettoyageTotal(language),
      pathname,
      width: nettoyageTotal(width),
      height: nettoyageTotal(height),
      orientation: nettoyageTotal(orientation),
      duration: nettoyageTotal(duration)
    }
    const testSiUUIDExiste = await statistiques('infosUtilisation')
      .select()
      .where({ uuid: infosClean.uuid })

    if (testSiUUIDExiste.length !== 1) {
      await statistiques('infosUtilisation')
        .insert(infosClean)
    } else {
      await statistiques('infosUtilisation')
        .update({ duration: infosClean.duration })
        .where({ uuid: infosClean.uuid })
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.nettoyageStatistiques = async () => {
  try {
    const dateDuJour = new Date()
    const offset = (24 * 60 * 60 * 1000) * 90 * 3
    const statsExpire = dateDuJour.setTime(dateDuJour.getTime() - offset)
    const dateStatsExpire = new Date(statsExpire)

    if (process.env.NODE_ENV === 'development') {
      // en environnement de dev on est sur sqlite3 qui gère différement les dates - on doit donc passer par une cmd brute
      await statistiques.raw(
        "DELETE FROM infosUtilisation WHERE ouverture < datetime('now','-3 month', 'localtime')")
    } else {
      await statistiques('infosUtilisation')
        .where('ouverture', '<', dateStatsExpire)
        .del()
    }
  } catch (error) {
    logger.error(error)
  }
}
