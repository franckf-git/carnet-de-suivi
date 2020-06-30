'use strict'
const {
  recuperationPseudoParIdUtilisateur
} = require('./../fonctionalites/model')
const logger = require('./../utils/logger')

exports.suggestion = async (req, res, next) => {
  try {
    const titre = 'Faire une suggestion'
    if (req.session.utilisateur && req.session.cookie) {
      const connecte = true
      const idUtilisateur = req.session.utilisateur
      const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
      console.log("connecte", connecte)
      res.render('./echanges/suggestion', { pseudo, titre, connecte })
    } else {
      const connecte = false
      console.log("connecte", connecte)
      res.render('./echanges/suggestion', { titre, connecte })
    }
  } catch (error) {
    logger.error(error)
  }
}
