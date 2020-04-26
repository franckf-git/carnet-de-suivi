'use strict'
const statistiques = require('./../../config/basededonnees/statistiques')
const { nettoyageTotal } = require('./../utils')

exports.enregistrementInfosBDD = async (infos) => {
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
    console.error(error)
  }
}
