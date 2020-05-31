'use strict'
const {
  recuperationPseudoParIdUtilisateur,
  recuperationElevesParIdUtilisateur,
  recuperationObjectifsParDomaine,
  recuperationAttendusParObjectif
} = require('./../model')
const {
  recuperationTitreActiviteParObservation,
  recuperationAttenduEvalueParObservation,
  recuperationCriteres,
  enregistrementNouvelleObservation,
  enregistrementNouvelAttenduPersonnalise,
  enregistrementEvaluations,
  miseajourObservationAvecAttendu,
  miseajourEvaluations,
  verificationPresenceEleves,
  verificationEvaluationFaite
} = require('./model')
const { nettoyageTotal } = require('./../../utils')
const logger = require('./../../utils/logger')
const validator = require('validator')

exports.domaine = async (req, res, next) => {
  try {
    const titre = 'Créer une observation'
    const idUtilisateur = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    const elevesPresents = await verificationPresenceEleves(idUtilisateur)
    if (!elevesPresents) {
      return res.render('./applications/fonctionalites/views/elevesAbsents', { pseudo, titre })
    }
    res.render('./applications/fonctionalites/views/observationDomaine', { pseudo, titre })
  } catch (error) {
    logger.error(error)
  }
}

exports.nouvelleObservationDomaine = async (req, res, next) => {
  try {
    const idUtilisateur = req.session.utilisateur
    const titreEscape = validator.blacklist(req.body.titre, '<')
    const titreActivite = nettoyageTotal(titreEscape)
    const description = nettoyageTotal(req.body.description)
    const domaine = req.body.domaine
    const idObservation = await enregistrementNouvelleObservation(idUtilisateur,
      titreActivite,
      description)

    const objectifsDuDomaine = await recuperationObjectifsParDomaine(domaine)
    const creationArborescenceReferentiel = async (objectifsDuDomaine) => {
      // on utilise map car forEach ne fonctionne pas avec await
      const arborescenceItems = await objectifsDuDomaine.map(async (objectif) => {
        const idObjectif = objectif.id
        const attendusDelObjectif = await recuperationAttendusParObjectif(idObjectif)
        const arborescenceItem = { objectif, attendusDelObjectif }
        return arborescenceItem
      })
      const arborescenceReferentiel = await Promise.all(arborescenceItems)
      return arborescenceReferentiel
    }
    const arborescenceReferentiel = await creationArborescenceReferentiel(objectifsDuDomaine)

    const titre = 'Choisir les objectifs'
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/observationObjectifs', { pseudo, titre, arborescenceReferentiel, idObservation })
  } catch (error) {
    logger.error(error)
  }
}

exports.nouvelleObservationChoixAttendu = async (req, res, next) => {
  try {
    const idUtilisateur = req.session.utilisateur
    let { attenduPersonnalise } = req.body
    const {
      idObjectif,
      idObservation,
      idAttendu
    } = req.body

    if (typeof attenduPersonnalise !== 'undefined') {
      attenduPersonnalise = nettoyageTotal(attenduPersonnalise)
      const idAttenduPersonnalise = await enregistrementNouvelAttenduPersonnalise(idUtilisateur, attenduPersonnalise, idObjectif)
      await miseajourObservationAvecAttendu(idObservation, idAttenduPersonnalise[0], 0)
    } else {
      await miseajourObservationAvecAttendu(idObservation, idAttendu, 1)
    }

    const listeEleves = await recuperationElevesParIdUtilisateur(idUtilisateur)
    const titreActivite = await recuperationTitreActiviteParObservation(idObservation)
    const attenduEvalue = await recuperationAttenduEvalueParObservation(idObservation)
    const criteres = await recuperationCriteres()

    const titre = 'Evaluer vos élèves'
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/observationEvaluation', { pseudo, titre, titreActivite, attenduEvalue, idObservation, listeEleves, criteres })
  } catch (error) {
    logger.error(error)
  }
}

exports.enregistrementEvaluations = async (req, res, next) => {
  try {
    const { idObservation, idEleve, idCritere } = req.body
    const evaluationFaite = await verificationEvaluationFaite(idObservation, idEleve, idCritere)
    if (evaluationFaite) {
      await miseajourEvaluations(idObservation, idEleve, idCritere)
      res.json({ message: 'maj' })
    } else {
      await enregistrementEvaluations(idObservation, idEleve, idCritere)
      res.json({ message: 'evalue' })
    }
  } catch (error) {
    logger.error(error)
  }
}
