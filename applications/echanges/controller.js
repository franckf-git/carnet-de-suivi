'use strict'
const { recuperationPseudoParIdUtilisateur } = require('./../fonctionalites/model')
const { enregistrementSuggestion } = require('./model')
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
    if (req.session.utilisateur && req.session.cookie) {
      const connecte = true
      const idUtilisateur = req.session.utilisateur
      const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
      res.render('./applications/echanges/messages', { pseudo, titre, connecte })
    } else {
      const connecte = false
      res.render('./applications/echanges/messages', { titre, connecte })
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.nouveauMessage = async (req, res, next) => {
  try {
    const idUtilisateur = req.session.utilisateur
  } catch (error) {
    logger.error(error)
  }
}
