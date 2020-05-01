'use strict'
const core = require('./../../config/basededonnees/core')
const bcrypt = require('bcrypt')
const validator = require('validator')

const idUtilisateurDepuisEmail = async (email) => {
  const emailNormaliser = validator.normalizeEmail(email)
  const retourBdd = await core('utilisateurs')
    .select('id')
    .where({ email: emailNormaliser })
  const idUtilisateur = retourBdd[0].id
  return idUtilisateur
}

exports.enregistreNouveauUtilisateurBDD = async (infosFormulaire) => {
  try {
    const { pseudo, email, motdepasse } = infosFormulaire
    const emailNormaliser = validator.normalizeEmail(email)
    const motdepassechiffre = await bcrypt.hash(motdepasse, 12)
    await core('utilisateurs')
      .insert({
        pseudo,
        email: emailNormaliser,
        motdepasse: motdepassechiffre
      })
  } catch (error) {
    console.error(error)
  }
}

exports.nouveauMotDePasseBDD = async (infosFormulaire) => {
  try {
    const { uuid, motdepasse } = infosFormulaire
    const motdepassechiffre = await bcrypt.hash(motdepasse, 12)
    const idUtilisateur = await core('reinitialisationMDP')
      .select('idUtilisateur')
      .where({ uuid })
    /**
     * les UPDATE en JOIN ne fonctionnent pas en SQLITE - on doit donc passer par deux requetes
     * a optimiser en fonction de la base de données de production
     */
    await core('utilisateurs')
      .update({
        motdepasse: motdepassechiffre
      })
      .where({ id: idUtilisateur[0].idUtilisateur })
  } catch (error) {
    console.error(error)
  }
}

exports.utilisateurConfirme = async (uuidEnAttenteDeValidation) => {
  try {
    const id = await core('confirmationMail')
      .select('idUtilisateur')
      .where({ uuid: uuidEnAttenteDeValidation })
    /**
     * les UPDATE en JOIN ne fonctionnent pas en SQLITE - on doit donc passer par deux requetes
     * a optimiser en fonction de la base de données de production
     */
    await core('utilisateurs')
      .update({ confirme: 1 })
      .where({ id: id[0].idUtilisateur })
  } catch (error) {
    console.error(error)
  }
}

exports.recuperationIdUtilisateurBdd = async (emailATester) => {
  try {
    const emailATesterNormaliser = validator.normalizeEmail(emailATester)
    return await idUtilisateurDepuisEmail(emailATesterNormaliser)
  } catch (error) {
    console.error(error)
  }
}

exports.recuperationEmailUtilisateurParUUIDBdd = async (uuidEnAttenteDeValidation) => {
  try {
    const email = await core('confirmationMail')
      .join('utilisateurs', 'confirmationMail.idUtilisateur', '=', 'utilisateurs.id')
      .select('utilisateurs.email')
      .where({ 'confirmationMail.uuid': uuidEnAttenteDeValidation })
    const emailDelUUID = validator.normalizeEmail(email[0].email)
    return emailDelUUID
  } catch (error) {
    console.error(error)
  }
}

exports.miseaJourDerniereConnexion = async (id) => {
  try {
    const timeStamp = new Date().toISOString()
    await core('utilisateurs')
      .update({ derniereConnexion: timeStamp })
      .where({ id })
  } catch (error) {
    console.error(error)
  }
}

exports.checkEmail = async (emailATester) => {
  try {
    const emailATesterNormaliser = validator.normalizeEmail(emailATester)
    const emailExiste = await core('utilisateurs')
      .select('email')
      .where({ email: emailATesterNormaliser })
    if (emailExiste[0] !== undefined) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

exports.checkEmailConfirmation = async (emailATester) => {
  try {
    const emailATesterNormaliser = validator.normalizeEmail(emailATester)
    const confirmeEnBase = await core('utilisateurs')
      .select('confirme')
      .where({ email: emailATesterNormaliser })
    if (confirmeEnBase[0] !== undefined && confirmeEnBase[0].confirme === 1) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

exports.checkMotdePasse = async (emailATester, mdpATester) => {
  try {
    const emailATesterNormaliser = validator.normalizeEmail(emailATester)
    const mdpEnBase = await core('utilisateurs')
      .select('motdepasse')
      .where({ email: emailATesterNormaliser })
    if (mdpEnBase[0] !== undefined) {
      return bcrypt.compare(mdpATester, mdpEnBase[0].motdepasse)
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

exports.checkUUID = async (uuid) => {
  try {
    const testConfirmationMail = await core('confirmationMail')
      .select()
      .where({ uuid, utilise: 0 })
    const testReinitialisationMDP = await core('reinitialisationMDP')
      .select()
      .where({ uuid, utilise: 0 })
    if (testConfirmationMail[0] !== undefined || testReinitialisationMDP[0] !== undefined) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}

exports.uuidUtilisePourConfirmer = async (uuidEnAttenteDeValidation) => {
  try {
    return await core('confirmationMail')
      .where({ uuid: uuidEnAttenteDeValidation })
      .update({ utilise: 1 })
  } catch (error) {
    console.error(error)
  }
}

exports.uuidUtilisePourReinitialiser = async (uuidEnAttenteDeValidation) => {
  try {
    return await core('reinitialisationMDP')
      .where({ uuid: uuidEnAttenteDeValidation })
      .update({ utilise: 1 })
  } catch (error) {
    console.error(error)
  }
}

exports.entreeConfirmationMail = async (emailAConfirmer, uuidaValider) => {
  try {
    const emailAConfirmerNormaliser = validator.normalizeEmail(emailAConfirmer)
    const uuid = uuidaValider
    const idUtilisateur = await idUtilisateurDepuisEmail(emailAConfirmerNormaliser)
    await core('confirmationMail')
      .insert({ idUtilisateur, uuid })
  } catch (error) {
    console.error(error)
  }
}

exports.entreeReinitialisationMDP = async (emailAReinitialiser, uuidReinitialisationMotdePasse) => {
  try {
    const emailAReinitialiserNormaliser = validator.normalizeEmail(emailAReinitialiser)
    const uuid = uuidReinitialisationMotdePasse
    const idUtilisateur = await idUtilisateurDepuisEmail(emailAReinitialiserNormaliser)
    await core('reinitialisationMDP')
      .insert({ idUtilisateur, uuid })
  } catch (error) {
    console.error(error)
  }
}

exports.nettoyageLiensMailsetMdpOubliesBDD = async () => {
  try {
    const dateDuJour = new Date()
    const offset = (24 * 60 * 60 * 1000) * 3
    const lienExpire = dateDuJour.setTime(dateDuJour.getTime() - offset)
    const dateLienExpire = new Date(lienExpire)

    if (process.env.NODE_ENV === 'development') {
      // en environnement de dev on est sur sqlite3 qui gère différement les dates - on doit donc passer par une cmd brute
      await core.raw("DELETE FROM confirmationMail WHERE envoiMail < datetime('now','-3 day', 'localtime')")
      await core.raw("DELETE FROM reinitialisationMDP WHERE envoiMail < datetime('now','-3 day', 'localtime')")
    } else {
      await core('confirmationMail')
        .where('envoiMail', '<', dateLienExpire)
        .del()
      await core('reinitialisationMDP')
        .where('envoiMail', '<', dateLienExpire)
        .del()
    }

    return true
  } catch (error) {
    console.error(error)
  }
}
