'use strict'
const core = require('./../../config/basededonnees/core')
const observations = require('./../../config/basededonnees/observations')
const referentiel = require('./../../config/basededonnees/referentiel')
const logger = require('./../utils/logger')

exports.recuperationPseudoParIdUtilisateur = async (id) => {
  try {
    const recherche = await core('utilisateurs')
      .select('pseudo')
      .where({ id })
    const pseudo = recherche[0].pseudo
    return pseudo
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationNomEleveParId = async (id) => {
  try {
    const recherche = await observations('eleves')
      .select('nom')
      .where({ id })
    const nom = recherche[0].nom
    return nom
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationElevesParIdUtilisateur = async (idUtilisateur) => {
  try {
    const recherche = await observations('eleves')
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
    const recherche = await observations('eleves')
      .select()
      .where({ idUtilisateur, actif: 0 })
      .orderBy('nom')
    const listeEleves = recherche
    return listeEleves
  } catch (error) {
    logger.error(error)
  }
}

exports.miseajourEleve = async (id, nom) => {
  try {
    await observations('eleves')
      .update({ nom })
      .where({ id })
  } catch (error) {
    logger.error(error)
  }
}

exports.desactivationEleve = async (id) => {
  try {
    await observations('eleves')
      .update({ actif: 0 })
      .where({ id })
  } catch (error) {
    logger.error(error)
  }
}

exports.ajoutEleveBDD = async (nom, idUtilisateur) => {
  try {
    await observations('eleves').insert({ nom, idUtilisateur })
  } catch (error) {
    logger.error(error)
  }
}

exports.verificationPresenceEleves = async (idUtilisateur) => {
  try {
    const recherche = await observations('eleves')
      .select()
      .where({ idUtilisateur, actif: 1 })
      .limit(1)
    if (typeof recherche[0] === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.enregistrementNouvelleObservationBDD = async (idUtilisateur, titre, description, idAttendu) => {
  try {
    return await observations('observations').insert({ idUtilisateur, titre, description, idAttendu })
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObjectifsDuDomaine = async (idDomaine) => {
  try {
    const recherche = await referentiel('objectifs').select().where({ idDomaine })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttendusDelObjectif = async (idObjectif) => {
  try {
    const recherche = await referentiel('attendus').select().where({ idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttendusDelObjectif = async (idObjectif) => {
  try {
    const recherche = await referentiel('attendus').select().where({ idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttendusPersoDelObjectif = async (idObjectif) => {
  try {
    const recherche = await observations('attendusPersonnalises').select().where({ idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.nouvelAttenduPersonnalise = async (idUtilisateur, attenduPersonnalise, idObjectif) => {
  try {
    return await observations('attendusPersonnalises').insert({
      idUtilisateur,
      idObjectif,
      attendu: attenduPersonnalise
    })
  } catch (error) {
    logger.error(error)
  }
}

exports.miseaJourObservationAvecAttendu = async (idObservation, idAttendu, referentielRecommande) => {
  try {
    return await observations('observations').update({ idAttendu, referentielRecommande }).where({ id: idObservation })
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationTitreActivite = async (idObservation) => {
  try {
    const recherche = await observations('observations').select('titre').where({ id: idObservation })
    return recherche[0].titre
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttenduEvalue = async (idObservation) => {
  try {
    const recherche = await observations('observations').select('idAttendu', 'referentielRecommande').where({ id: idObservation })
    const idAttendu = recherche[0].idAttendu
    const referentielRecommande = recherche[0].referentielRecommande
    if (referentielRecommande) {
      const attendu = await referentiel('attendus').select('attendu').where({ id: idAttendu })
      return attendu[0].attendu
    } else {
      const attendu = await observations('attendusPersonnalises').select('attendu').where({ id: idAttendu })
      return attendu[0].attendu
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationCriteres = async () => {
  try {
    const recherche = await referentiel('criteres').select()
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.checkEvaluationFaite = async (idObservation, idEleve) => {
  try {
    const recherche = await observations('evaluations').select().where({ idObservation, idEleve })
    if (typeof recherche[0] === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.miseaJourEvaluationsBDD = async (idObservation, idEleve, idCritere) => {
  try {
    return await observations('evaluations').update({ idCritere }).where({ idObservation, idEleve })
  } catch (error) {
    logger.error(error)
  }
}

exports.enregistrementEvaluationsBDD = async (idObservation, idEleve, idCritere) => {
  try {
    return await observations('evaluations').insert({ idObservation, idEleve, idCritere })
  } catch (error) {
    logger.error(error)
  }
}

exports.verificationLienEleveProf = async (idEleve, idUtilisateur) => {
  try {
    const recherche = await observations('eleves').select().where({ id: idEleve, idUtilisateur })
    if (typeof recherche[0] === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationEvaluationParObservation = async (idEleve) => {
  try {
    return await observations('evaluations').select('idObservation', 'idCritere').where({ idEleve })
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObservationparId = async (idObservation) => {
  try {
    const recherche = await observations('observations').select().where({ id: idObservation })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObjectifparId = async (idObjectif) => {
  try {
    const recherche = await referentiel('objectifs').select().where({ id: idObjectif })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationDomaineparId = async (idDomaine) => {
  try {
    const recherche = await referentiel('domaines').select().where({ id: idDomaine })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationAttenduparIdObservation = async (idObservation) => {
  try {
    const recherche = await observations('observations').select('idAttendu', 'referentielRecommande').where({ id: idObservation })
    const idAttendu = recherche[0].idAttendu
    const referentielRecommande = recherche[0].referentielRecommande
    if (referentielRecommande) {
      const attendu = await referentiel('attendus').select().where({ id: idAttendu })
      return attendu
    } else {
      const attendu = await observations('attendusPersonnalises').select().where({ id: idAttendu })
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

exports.recuperationObservationsDelAttendu = async (idAttendu) => {
  try {
    const recherche = await observations('observations').select().where({ idAttendu, referentielRecommande: 1 })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}

exports.recuperationObservationsDelAttenduPerso = async (idAttendu) => {
  try {
    const recherche = await observations('observations').select().where({ idAttendu, referentielRecommande: 0 })
    return recherche
  } catch (error) {
    logger.error(error)
  }
}
