'use strict'
const core = require('./../../config/basededonnees/core')
const carnetdesuivi = require('./../../config/basededonnees/carnetdesuivi')
const referentiel = require('./../../config/basededonnees/referentiel')
const logger = require('./../utils/logger')

exports.recuperationPseudoParIdUtilisateur = async (idUtilisateur) => {
  try {
    const recherche = await core('utilisateurs')
      .select('pseudo')
      .where({ id: idUtilisateur })
    const pseudo = recherche[0].pseudo
    return pseudo
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationElevesParIdUtilisateur = async (idUtilisateur) => {
  try {
    const recherche = await carnetdesuivi('eleves')
      .select()
      .where({ idUtilisateur, actif: 1 })
      .orderBy('nom')
    const listeEleves = recherche
    return listeEleves
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationElevesDesactivesParIdUtilisateur = async (idUtilisateur) => {
  try {
    const recherche = await carnetdesuivi('eleves')
      .select()
      .where({ idUtilisateur, actif: 0 })
      .orderBy('nom')
    const listeEleves = recherche
    return listeEleves
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObjectifsParDomaine = async (idDomaine) => {
  try {
    const recherche = await referentiel('objectifs').select().where({ idDomaine })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttendusParObjectif = async (idObjectif) => {
  try {
    const recherche = await referentiel('attendus').select().where({ idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObservationParId = async (idObservation) => {
  try {
    const recherche = await carnetdesuivi('observations').select().where({ id: idObservation })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttenduParObservation = async (idObservation) => {
  try {
    const recherche = await carnetdesuivi('observations').select('idAttendu', 'referentielRecommande').where({ id: idObservation })
    const idAttendu = recherche[0].idAttendu
    const referentielRecommande = recherche[0].referentielRecommande
    if (referentielRecommande) {
      const attendu = await referentiel('attendus').select().where({ id: idAttendu })
      return attendu
    } else {
      const attendu = await carnetdesuivi('attendusPersonnalises').select().where({ id: idAttendu })
      return attendu
    }
  } catch (error) {
    logger.error(error)
  }
}
