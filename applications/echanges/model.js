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

exports.enregistrementMessage = async (texteMessage, idUtilisateur) => {
  try {
    await echanges('messages')
      .insert({ texteMessage, idUtilisateur })
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationMessages = async () => {
  try {
    const recherche = await echanges('messages').select()
    return recherche
  } catch (error) {
    logger.error(error)
  }
}
