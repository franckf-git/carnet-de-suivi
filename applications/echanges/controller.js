'use strict'
const { recuperationPseudoParIdUtilisateur } = require('./../fonctionalites/model')
const { enregistrementSuggestion } = require('./model')
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
    const texteSuggestion = nettoyageTotal(req.body.texteSuggestion)
    const idUtilisateur = req.session.utilisateur
    await enregistrementSuggestion(texteSuggestion, idUtilisateur)
    res.redirect('/acceuil')
  } catch (error) {
    logger.error(error)
  }
}
