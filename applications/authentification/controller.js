'use strict'
const {
  enregistreNouveauUtilisateurBDD,
  utilisateurConfirme,
  nouveauMotDePasseBDD,
  uuidUtilisePourConfirmer,
  uuidUtilisePourReinitialiser,
  recuperationIdUtilisateurBdd,
  recuperationEmailUtilisateurParUUIDBdd
} = require(
  './model')
const { verificationChampsFormulaire } = require('./controllerErreurs')
const { envoiMailConfirmation, envoiMailReinitialisation } = require('./envoiMails')
const { nettoyageTotal } = require('./../utils')

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

    await enregistreNouveauUtilisateurBDD(champsFormulaire)
    await envoiMailConfirmation(champsFormulaire.email)
    res.render('./applications/authentification/views/enregistrementTermine', { titre: 'Merci' })
  } catch (error) {
    console.error(error)
  }
}

exports.confirmationEmail = async (req, res, next) => {
  try {
    const uuid = req.params.uuid
    const email = await recuperationEmailUtilisateurParUUIDBdd(uuid)
    await utilisateurConfirme(uuid)
    await uuidUtilisePourConfirmer(uuid)
    res.render('./applications/authentification/views/enregistrementEmailConfirme', { titre: 'Merci', email })
  } catch (error) {
    console.error(error)
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

    const recuperationIdUtilisateur = await recuperationIdUtilisateurBdd(champsFormulaire.email)
    req.session.utilisateur = recuperationIdUtilisateur
    res.redirect('/acceuil')
  } catch (error) {
    console.error(error)
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
    console.error(error)
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

    await nouveauMotDePasseBDD({ ...champsFormulaire, uuid })
    await uuidUtilisePourReinitialiser(uuid)
    res.render(
      './applications/authentification/views/motdepasseoublieNouveauMotdePasseTermine', { titre: 'Merci' })
  } catch (error) {
    console.error(error)
  }
}
