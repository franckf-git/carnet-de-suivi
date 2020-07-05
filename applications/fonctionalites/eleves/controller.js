'use strict'
const {
  recuperationPseudoParIdUtilisateur,
  recuperationElevesParIdUtilisateur,
  recuperationElevesDesactivesParIdUtilisateur
} = require('./../model')
const {
  miseajourEleve,
  desactivationEleve,
  reactivationEleve,
  ajoutEleve
} = require('./model')
const { nettoyageTotal } = require('./../../utils')
const logger = require('./../../utils/logger')

exports.eleves = async (req, res, next) => {
  try {
    const titre = 'Gestion des élèves'
    const idUtilisateur = req.session.utilisateur
    const listeEleves = await recuperationElevesParIdUtilisateur(idUtilisateur)
    const listeElevesDesactives = await recuperationElevesDesactivesParIdUtilisateur(idUtilisateur)
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/eleves', { pseudo, titre, listeEleves, listeElevesDesactives })
  } catch (error) {
    logger.error(error)
  }
}

exports.editionEleves = async (req, res, next) => {
  try {
    const idEleve = req.params.id
    if (req.body.sauver === '') {
      const nom = nettoyageTotal(req.body.nom)
      await miseajourEleve(idEleve, nom)
    } else if (req.body.desactivation === '') {
      await desactivationEleve(idEleve)
    } else if (req.body.reactivation === '') {
      await reactivationEleve(idEleve)
    }
    res.redirect('/eleves')
  } catch (error) {
    logger.error(error)
  }
}

exports.ajoutNouvelEleve = async (req, res, next) => {
  try {
    const nom = nettoyageTotal(req.body.nom)
    const idUtilisateur = req.session.utilisateur
    await ajoutEleve(nom, idUtilisateur)
    res.redirect('/eleves')
  } catch (error) {
    logger.error(error)
  }
}
