'use strict'
const {
  recuperationElevesParIdUtilisateur,
  recuperationElevesDesactivesParIdUtilisateur,
  recuperationPseudoParIdUtilisateur,
  miseajourEleve,
  desactivationEleve,
  reactivationEleve,
  ajoutEleveBDD,
  verificationPresenceEleves,
  enregistrementNouvelleObservation,
  recuperationObjectifsParDomaine,
  recuperationAttendusParObjectif,
  recuperationAttendusPersoParObjectif,
  enregistrementNouvelAttenduPersonnalise,
  miseajourObservationAvecAttendu,
  recuperationTitreActiviteParObservation,
  recuperationAttenduEvalueParObservation,
  recuperationCriteres,
  verificationEvaluationFaite,
  miseajourEvaluations,
  enregistrementEvaluations,
  verificationLienEleveProf,
  recuperationNomEleveParId,
  recuperationEvaluationParEleve,
  recuperationObservationParId,
  recuperationObjectifParId,
  recuperationDomaineParId,
  recuperationAttenduParObservation,
  recuperationDomaines,
  recuperationObservationsParAttendu,
  recuperationObservationsParAttenduPerso
} = require('./model')
const { nettoyageTotal } = require('./../utils')
const logger = require('./../utils/logger')
const validator = require('validator')

/**********************/
const creationArborescenceCarnetParStructure = async () => {
  const domaines = await recuperationDomaines()
  const domaineArborescenceVersObservations = await Promise.all(descendreDansReferentielDomaine(domaines))
  return domaineArborescenceVersObservations
}

const descendreDansReferentielDomaine = (domaines) => domaines.map(async (domaine) => {
  const objectifsDuDomaine = await recuperationObjectifsParDomaine(domaine.id)

  const objectifs = await Promise.all(descendreDansReferentielObjectif(objectifsDuDomaine))
  const domaineETobjectifsETattendusETobservations = { ...domaine, objectifs }
  return domaineETobjectifsETattendusETobservations
})

const descendreDansReferentielObjectif = (objectifsDuDomaine) => objectifsDuDomaine.map(async (objectif) => {
  const attendusDelObjectif = await recuperationAttendusParObjectif(objectif.id)
  const attendus = await Promise.all(descendreDansReferentielAttendus(attendusDelObjectif))

  const attendusPersoDelObjectif = await recuperationAttendusPersoParObjectif(objectif.id)
  const attendusPerso = await Promise.all(descendreDansReferentielAttendusPerso(attendusPersoDelObjectif))

  const objectifsETattendusETattendusPersoETobservations = { ...objectif, attendus, attendusPerso }
  return objectifsETattendusETattendusPersoETobservations
})

const descendreDansReferentielAttendus = (attendusDelObjectif) => attendusDelObjectif.map(async (attendu) => {
  const observations = await recuperationObservationsParAttendu(attendu.id)
  const attendusETobservations = { ...attendu, observations }
  return attendusETobservations
})

const descendreDansReferentielAttendusPerso = (attendusPersoDelObjectif) => attendusPersoDelObjectif.map(async (attenduPerso) => {
  const observations = await recuperationObservationsParAttenduPerso(attenduPerso.id)
  const attendusPersoETobservations = { ...attenduPerso, observations }
  return attendusPersoETobservations
})
/**********************/

exports.acceuil = async (req, res, next) => {
  try {
    const titre = 'Bonjour'
    const idUtilisateur = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/acceuil', { pseudo, titre })
  } catch (error) {
    logger.error(error)
  }
}

exports.eleves = async (req, res, next) => {
  try {
    const titre = 'Gestion des élèves'
    const idUtilisateur = req.session.utilisateur
    const listeEleves = await recuperationElevesParIdUtilisateur(idUtilisateur)
    const listeElevesDesactives = await recuperationElevesDesactivesParIdUtilisateur(idUtilisateur)
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/eleves', { pseudo, titre, listeEleves, listeElevesDesactives })
  } catch (error) {
    logger.error(error)
  }
}

exports.editionEleves = async (req, res, next) => {
  try {
    const { id } = req.params
    if (req.body.sauver === '') {
      const { nom } = req.body
      await miseajourEleve(id, nom)
    } else if (req.body.desactivation === '') {
      await desactivationEleve(id)
    } else if (req.body.reactivation === '') {
      await reactivationEleve(id)
    }
    res.redirect('/eleves')
  } catch (error) {
    logger.error(error)
  }
}

exports.ajoutEleve = async (req, res, next) => {
  try {
    const nom = nettoyageTotal(req.body.nom)
    const idUtilisateur = req.session.utilisateur
    await ajoutEleveBDD(nom, idUtilisateur)
    res.redirect('/eleves')
  } catch (error) {
    logger.error(error)
  }
}

exports.exportcsa = async (req, res, next) => {
  try {
    const titre = 'Export du carnet de suivi'
    const idUtilisateur = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    const listeEleves = await recuperationElevesParIdUtilisateur(idUtilisateur)
    const listeElevesDesactives = await recuperationElevesDesactivesParIdUtilisateur(idUtilisateur)
    res.render('./applications/fonctionalites/views/exportcsa', { pseudo, titre, listeEleves, listeElevesDesactives })
  } catch (error) {
    logger.error(error)
  }
}

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
    const check = await verificationEvaluationFaite(idObservation, idEleve, idCritere)
    if (check) {
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

exports.parents = async (req, res, next) => {
  try {
    res.redirect('/bientot')
  } catch (error) {
    logger.error(error)
  }
}

exports.partage = async (req, res, next) => {
  try {
    res.redirect('/bientot')
  } catch (error) {
    logger.error(error)
  }
}

exports.suivis = async (req, res, next) => {
  try {
    res.redirect('/bientot')
  } catch (error) {
    logger.error(error)
  }
}

exports.carnetdesuivi = async (req, res, next) => {
  try {
    const idEleve = req.params.id
    const idUtilisateur = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(idUtilisateur)
    const nomEleve = await recuperationNomEleveParId(idEleve)
    const titre = `Carnet de suivi de ${nomEleve}`

    const checkEleveProf = await verificationLienEleveProf(idEleve, idUtilisateur)
    if (!checkEleveProf) {
      return res.render('./applications/fonctionalites/views/eleveInconnu', { pseudo })
    }

    const evaluationsDelEleve = await recuperationEvaluationParEleve(idEleve)

    /* de l'évalaution on remonte l'arborescence */
    const creationArborescenceCarnetParEvaluation = async (evaluationsDelEleve) => {
      const elementArborescenceCarnet = await evaluationsDelEleve.map(async (evaluation) => {
        const idObservation = evaluation.idObservation
        const infosObservation = await recuperationObservationParId(idObservation)

        const infosAttendu = await recuperationAttenduParObservation(idObservation)

        const objectif = infosAttendu[0].idObjectif
        const infosObjectif = await recuperationObjectifParId(objectif)

        const domaine = infosObjectif[0].idDomaine
        const infosDomaine = await recuperationDomaineParId(domaine)

        const object = { domaine: infosDomaine[0], objectif: infosObjectif[0], attendu: infosAttendu[0], observation: infosObservation[0], evaluation: evaluation.idCritere }
        return object
      })
      const arborescenceCarnet = await Promise.all(elementArborescenceCarnet)
      return arborescenceCarnet
    }
    const retourParEvaluation = await creationArborescenceCarnetParEvaluation(evaluationsDelEleve)

    const retourParStructure = await creationArborescenceCarnetParStructure()

    res.render('./applications/fonctionalites/views/carnetEleve', { pseudo, titre, retourParEvaluation, retourParStructure })
  } catch (error) {
    logger.error(error)
  }
}
