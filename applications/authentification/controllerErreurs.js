'use strict'
const {
  checkEmail,
  checkEmailConfirmation,
  checkMotdePasse,
  checkUUID
} = require('./model')
const validator = require('validator')

exports.verificationChampsFormulaire = async (champsFormulaire, route) => {
  try {
    const { pseudo, email, motdepasse, motdepasseconfirm } = champsFormulaire
    const erreursDuFormulaire = []

    /* tests mot de passe longueur et espaces */
    if (route === 'connexion' || route === 'enregistrement' || route === 'nouveaumotdepasse') {
      const longueurMotdePasse = await validator.isLength(motdepasse, { min: 8, max: 32 })
      const espacesDansMotdePasse = await validator.contains(motdepasse, ' ')
      if (!longueurMotdePasse) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Le mot de passe doit être entre 8 et 32 caractères. Merci de le corriger.' })
      }
      if (espacesDansMotdePasse) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Les espaces ne sont pas autorisés pour les mots de passes. Merci de le corriger.' })
      }
    }

    /* test si le mot de passe est correct */
    if (route === 'connexion') {
      const motdePasseValide = await checkMotdePasse(email, motdepasse)
      if (!motdePasseValide) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Le mot de passe fourni est incorrect. Vérifiez votre mot de passe ou utilisez "J\'ai oublié mon de passe" ci-dessous.' })
      }
    }

    /* test si le mot de passe est identique à la confirmation */
    if (route === 'enregistrement' || route === 'nouveaumotdepasse') {
      const comparaisonMotdePasse = validator.equals(motdepasse, motdepasseconfirm)
      if (!comparaisonMotdePasse) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Les champs mot de passe et confirmation ne correspondent pas. Merci de les vérifier.' })
      }
    }

    /* test si le champs email est bien formaté */
    if (route === 'connexion' || route === 'enregistrement' || route === 'motdepasseoublie') {
      const formatEmail = await validator.isEmail(email)
      if (!formatEmail) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Le champs email n\'est pas rempli avec un email ou contient des caractères interdits. Merci de le corriger.' })
      }
    }

    /* test la longeur du pseudo et si le compte n'existe pas déjà */
    if (route === 'enregistrement') {
      const longueurPseudo = await validator.isLength(pseudo, { min: 3, max: 32 })
      const emailExistant = await checkEmail(email)
      if (!longueurPseudo) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Le pseudo doit être entre 3 et 32 caractères. Merci de le corriger.' })
      }
      if (emailExistant) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Il y a déjà un compte sur notre site enregistré avec cet email. Essayez de vous connecter.' })
      }
    }

    /* test si le compte existe et à été confirmé */
    if (route === 'connexion' || route === 'motdepasseoublie') {
      const emailConfirmer = await checkEmailConfirmation(email)
      const emailExistant = await checkEmail(email)
      if (!emailConfirmer) {
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Votre compte existe bien mais vous n\'avez pas confirmé votre email. Vérifiez votre boite mail pour confirmer votre adresse.' })
      }
      /* le test du mail absent arrive en dernier pour vider les autres messages et qu'il ne reste que lui en retour car c'est le plus important */
      if (!emailExistant) {
        erreursDuFormulaire.length = 0
        erreursDuFormulaire
          .push({ messageDAvertissement: 'Il n\'y a pas de compte sur notre site enregistré avec cet email. Veuillez vous enregistrer d\'abord.' })
      }
    }

    if (erreursDuFormulaire.length > 0) {
      const messageDAvertissementsETvaleursDeChamps = {
        erreursDuFormulaire,
        pseudo,
        email,
        motdepasse,
        motdepasseconfirm
      }
      return messageDAvertissementsETvaleursDeChamps
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

exports.siUUIDvalide = async (req, res, next) => {
  const testUUID = await checkUUID(req.params.uuid)
  if (testUUID) {
    return next()
  } else {
    res.redirect('/lieninvalide')
  }
}
