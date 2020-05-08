'use strict'
const aide = require('./../../config/basededonnees/aide')
const logger = require('./../utils/logger')

exports.recuperationContenuAideBDD = async (intitule) => {
  try {
    const aAfficherDansLaPage = await aide('aideDansPage')
      .select('texte')
      .where({ intitule })
    return aAfficherDansLaPage[0].texte
  } catch (error) {
    logger.error(error)
  }
}
