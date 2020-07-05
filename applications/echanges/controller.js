'use strict'
const { recuperationPseudoParIdUtilisateur } = require('./../fonctionalites/model')
const { enregistrementSuggestion, enregistrementMessage, recuperationMessages } = require('./model')
const { nettoyageTotal } = require('./../utils')
const logger = require('./../utils/logger')

exports.suggestion = async (req, res, next) => {
  try {
    const titre = 'Faire une suggestion'
    if (req.session.utilisateur && req.session.cookie) {
      const connecte = true
      const idUtilisateur = req.session.utilisateur
      const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
      res.render('./applications/echanges/suggestion', { pseudo, titre, connecte })
    } else {
      const connecte = false
      res.render('./applications/echanges/suggestion', { titre, connecte })
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.nouvelleSuggestion = async (req, res, next) => {
  try {
    const texteSuggestion = req.body.texteSuggestion
    const idUtilisateur = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    await enregistrementSuggestion(texteSuggestion, idUtilisateur)
    res.render('./applications/echanges/suggestionEnvoyee', { pseudo, titre: 'Merci' })
  } catch (error) {
    logger.error(error)
  }
}

exports.messages = async (req, res, next) => {
  try {
    const titre = 'Tableau des messages'

    const messages = await recuperationMessages()
    const messagesPseudo = async (messages) => {
      const messagesFormatage = await messages.map(async (message) => {
        message.pseudo = await recuperationPseudoParIdUtilisateur(message.idUtilisateur)
        return message
      })
      const messagesComplets = await Promise.all(messagesFormatage)
      return messagesComplets
    }
    const messagesFormates = await messagesPseudo(messages)

    if (req.session.utilisateur && req.session.cookie) {
      const connecte = true
      const idUtilisateur = req.session.utilisateur
      const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
      res.render('./applications/echanges/messages', { pseudo, titre, connecte, messagesFormates })
    } else {
      const connecte = false
      res.render('./applications/echanges/messages', { titre, connecte, messagesFormates })
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.nouveauMessage = async (req, res, next) => {
  try {
    const texteMessage = nettoyageTotal(req.body.texteMessage)
    const idUtilisateur = req.session.utilisateur
    await enregistrementMessage(texteMessage, idUtilisateur)
    res.redirect('./messages')
  } catch (error) {
    logger.error(error)
  }
}
