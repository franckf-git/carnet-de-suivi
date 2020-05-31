'use strict'
const carnetdesuivi = require('./../../../config/basededonnees/carnetdesuivi')
const referentiel = require('./../../../config/basededonnees/referentiel')
const logger = require('./../../utils/logger')

exports.recuperationNomEleveParId = async (idEleve) => {
  try {
    const recherche = await carnetdesuivi('eleves')
      .select('nom')
      .where({ id: idEleve })
    const nom = recherche[0].nom
    return nom
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttendusPersoParObjectif = async (idObjectif) => {
  try {
    const recherche = await carnetdesuivi('attendusPersonnalises').select().where({ idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationEvaluationParEleve = async (idEleve) => {
  try {
    const recherche = await carnetdesuivi('evaluations').select('idObservation', 'idCritere').where({ idEleve })
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

exports.recuperationObjectifParId = async (idObjectif) => {
  try {
    const recherche = await referentiel('objectifs').select().where({ id: idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationDomaineParId = async (idDomaine) => {
  try {
    const recherche = await referentiel('domaines').select().where({ id: idDomaine })
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

exports.recuperationDomaines = async () => {
  try {
    const recherche = await referentiel('domaines').select()
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObservationsParAttendu = async (idAttendu) => {
  try {
    const recherche = await carnetdesuivi('observations').select().where({ idAttendu, referentielRecommande: 1 })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObservationsParAttenduPerso = async (idAttendu) => {
  try {
    const recherche = await carnetdesuivi('observations').select().where({ idAttendu, referentielRecommande: 0 })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.verificationLienEleveProf = async (idEleve, idUtilisateur) => {
  try {
    const recherche = await carnetdesuivi('eleves').select().where({ id: idEleve, idUtilisateur })
    if (typeof recherche[0] === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (error) {
    logger.error(error)
  }
}
