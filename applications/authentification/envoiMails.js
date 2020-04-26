'use strict'
const uuid = require('uuid')
const config = require('./../../config')
const { entreeConfirmationMail, entreeReinitialisationMDP } = require('./model')
const { envoiMailTemplate } = require('./../utils/envoiMailsTemplates')

exports.envoiMailConfirmation = async (emailAConfirmer) => {
  try {
    const uuidConfirmationMail = await uuid.v4()
    const domaine = `${config.DOMAIN}`
    const urluuid =
      `https://${config.DOMAIN}/confirmationmail/${uuidConfirmationMail}`
    const options = {
      titre: 'Confirmation de votre adresse email',
      objet: 'Confirmation de votre adresse email',
      domaine,
      email: emailAConfirmer,
      urluuid
    }

    await entreeConfirmationMail(emailAConfirmer, uuidConfirmationMail)
    await envoiMailTemplate('confirmationEmail', options)
  } catch (error) {
    console.error(error)
  }
}

exports.envoiMailReinitialisation = async (emailAReinitialiser) => {
  try {
    const uuidReinitialisationMotdePasse = await uuid.v4()
    const domaine = `${config.DOMAIN}`
    const urluuid =
      `https://${config.DOMAIN}/reinitialisationmotdepasse/${uuidReinitialisationMotdePasse}`
    const options = {
      titre: 'Réinitialisation de votre mot de passe',
      objet: 'Réinitialisation de votre mot de passe',
      domaine,
      email: emailAReinitialiser,
      urluuid
    }

    await entreeReinitialisationMDP(emailAReinitialiser, uuidReinitialisationMotdePasse)
    await envoiMailTemplate('reinitialisationMotdePasse', options)
  } catch (error) {
    console.error(error)
  }
}
