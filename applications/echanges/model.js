'use strict'
const echanges = require('./../../config/basededonnees/echanges')
const logger = require('./../utils/logger')

exports.enregistrementSuggestion = async (texteSuggestion, idUtilisateur) => {
  try {
    await echanges('suggestions')
      .insert({ texteSuggestion, idUtilisateur })
  } catch (error) {
    logger.error(error)
  }
}
