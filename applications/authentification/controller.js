'use strict'
const {
  enregistreNouveauUtilisateur,
  miseajourUtilisateurConfirme,
  miseajourNouveauMotDePasse,
  miseajourUuidUtilisePourConfirmer,
  miseajourUuidUtilisePourReinitialiser,
  recuperationIdUtilisateurParEmailTest,
  recuperationEmailUtilisateurParUUID,
  miseaJourDerniereConnexion
} = require(
  './model')
const { verificationChampsFormulaire } = require('./controllerErreurs')
const { envoiMailConfirmation, envoiMailReinitialisation } = require('./envoiMails')
const { nettoyageTotal } = require('./../utils')
const logger = require('./../utils/logger')

exports.enregistreNouveauUtilisateur = async (req, res, next) => {
  try {
    const { pseudo, email, motdepasse, motdepasseconfirm } = req.body
    const champsFormulaire = {
      pseudo: nettoyageTotal(pseudo),
      email: nettoyageTotal(email),
      motdepasse: nettoyageTotal(motdepasse),
      motdepasseconfirm: nettoyageTotal(motdepasseconfirm)
    }
    const testsChamps = await verificationChampsFormulaire(champsFormulaire, 'enregistrement')
    if (testsChamps !== true) {
      return res.status(401)
        .render('./applications/authentification/views/enregistrement', testsChamps)
    }

    await enregistreNouveauUtilisateur(champsFormulaire)
    await envoiMailConfirmation(champsFormulaire.email)
    res.render('./applications/authentification/views/enregistrementTermine', { titre: 'Merci' })
  } catch (error) {
    logger.error(error)
  }
}

exports.confirmationEmail = async (req, res, next) => {
  try {
    const uuid = req.params.uuid
    const email = await recuperationEmailUtilisateurParUUID(uuid)
    await miseajourUtilisateurConfirme(uuid)
    await miseajourUuidUtilisePourConfirmer(uuid)
    res.render('./applications/authentification/views/enregistrementEmailConfirme', { titre: 'Merci', email })
  } catch (error) {
    logger.error(error)
  }
}

exports.connexionUtilisateur = async (req, res, next) => {
  try {
    const { email, motdepasse } = req.body
    const champsFormulaire = {
      email: nettoyageTotal(email),
      motdepasse: nettoyageTotal(motdepasse)
    }
    const testsChamps = await verificationChampsFormulaire(champsFormulaire, 'connexion')
    if (testsChamps !== true) {
      return res.status(401)
        .render('./applications/authentification/views/connexion', testsChamps)
    }

    const idUtilisateur = await recuperationIdUtilisateurParEmailTest(champsFormulaire.email)
    await miseaJourDerniereConnexion(idUtilisateur)
    req.session.utilisateur = idUtilisateur
    res.redirect('/acceuil')
  } catch (error) {
    logger.error(error)
  }
}

exports.reinitialisationMotDePasse = async (req, res, next) => {
  try {
    const { email } = req.body
    const champsFormulaire = {
      email: nettoyageTotal(email)
    }
    const testsChamps = await verificationChampsFormulaire(champsFormulaire, 'motdepasseoublie')
    if (testsChamps !== true) {
      return res.status(401)
        .render('./applications/authentification/views/motdepasseoublie', testsChamps)
    }
    await envoiMailReinitialisation(champsFormulaire.email)
    res.render('./applications/authentification/views/motdepasseoublieTermine', { titre: 'Merci' })
  } catch (error) {
    logger.error(error)
  }
}

exports.nouveauMotDePasse = async (req, res, next) => {
  try {
    const uuid = req.params.uuid
    const { motdepasse, motdepasseconfirm } = req.body
    const champsFormulaire = {
      motdepasse: nettoyageTotal(motdepasse),
      motdepasseconfirm: nettoyageTotal(motdepasseconfirm)
    }
    const testsChamps = await verificationChampsFormulaire(champsFormulaire, 'nouveaumotdepasse')
    if (testsChamps !== true) {
      const testsChampsAvecUUID = { ...testsChamps, uuid }
      return res.status(401)
        .render('./applications/authentification/views/motdepasseoublieNouveauMotdePasse', testsChampsAvecUUID)
    }

    await miseajourNouveauMotDePasse({ ...champsFormulaire, uuid })
    await miseajourUuidUtilisePourReinitialiser(uuid)
    res.render(
      './applications/authentification/views/motdepasseoublieNouveauMotdePasseTermine', { titre: 'Merci' })
  } catch (error) {
    logger.error(error)
  }
}
