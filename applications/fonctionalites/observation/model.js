'use strict'
const carnetdesuivi = require('./../../../config/basededonnees/carnetdesuivi')
const referentiel = require('./../../../config/basededonnees/referentiel')
const logger = require('./../../utils/logger')

exports.recuperationCriteres = async () => {
  try {
    const recherche = await referentiel('criteres').select()
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.enregistrementNouvelleObservation = async (idUtilisateur, titre, description, idAttendu) => {
  try {
    const enregistrement = await carnetdesuivi('observations').insert({ idUtilisateur, titre, description, idAttendu })
    const idNouvelleObservation = enregistrement
    return idNouvelleObservation
  } catch (error) {
    logger.error(error)
  }
}

exports.enregistrementNouvelAttenduPersonnalise = async (idUtilisateur, attenduPersonnalise, idObjectif) => {
  try {
    const enregistrement = await carnetdesuivi('attendusPersonnalises').insert({
      idUtilisateur,
      idObjectif,
      attendu: attenduPersonnalise
    })
    const idNouvelAttenduPersonnalise = enregistrement
    return idNouvelAttenduPersonnalise
  } catch (error) {
    logger.error(error)
  }
}

exports.enregistrementEvaluations = async (idObservation, idEleve, idCritere) => {
  try {
    await carnetdesuivi('evaluations').insert({ idObservation, idEleve, idCritere })
  } catch (error) {
    logger.error(error)
  }
}

exports.miseajourObservationAvecAttendu = async (idObservation, idAttendu, referentielRecommande) => {
  try {
    await carnetdesuivi('observations').update({ idAttendu, referentielRecommande }).where({ id: idObservation })
  } catch (error) {
    logger.error(error)
  }
}

exports.miseajourEvaluations = async (idObservation, idEleve, idCritere) => {
  try {
    await carnetdesuivi('evaluations').update({ idCritere }).where({ idObservation, idEleve })
  } catch (error) {
    logger.error(error)
  }
}

exports.verificationEvaluationFaite = async (idObservation, idEleve) => {
  try {
    const recherche = await carnetdesuivi('evaluations').select().where({ idObservation, idEleve })
    if (typeof recherche[0] === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (error) {
    logger.error(error)
  }
}
