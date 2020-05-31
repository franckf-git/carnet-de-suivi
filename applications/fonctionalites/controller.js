'use strict'
const {
  recuperationPseudoParIdUtilisateur
} = require('./model')
const logger = require('./../utils/logger')

exports.acceuil = async (req, res, next) => {
  try {
    const titre = 'Bonjour'
    const idUtilisateur = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/acceuil', { pseudo, titre })
  } catch (error) {
    logger.error(error)
  }
}

exports.parents = async (req, res, next) => {
  try {
    res.redirect('/bientot')
  } catch (error) {
    logger.error(error)
  }
}

exports.partage = async (req, res, next) => {
  try {
    res.redirect('/bientot')
  } catch (error) {
    logger.error(error)
  }
}

exports.suivis = async (req, res, next) => {
  try {
    res.redirect('/bientot')
  } catch (error) {
    logger.error(error)
  }
}
