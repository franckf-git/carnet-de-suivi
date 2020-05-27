'use strict'
const aide = require('./../../config/basededonnees/aide')
const logger = require('./../utils/logger')

exports.recuperationContenuAide = async (intitule) => {
  try {
    const recherche = await aide('aideDansPage')
      .select('texte')
      .where({ intitule })
    const textedAideaAfficher = recherche[0].texte
    return textedAideaAfficher
  } catch (error) {
    logger.error(error)
  }
}
