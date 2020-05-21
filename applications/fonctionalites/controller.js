'use strict'
const {
  recuperationElevesParIdUtilisateur,
  recuperationElevesDesactivesParIdUtilisateur,
  recuperationPseudoParIdUtilisateur,
  miseajourEleve,
  desactivationEleve,
  ajoutEleveBDD,
  verificationPresenceEleves,
  enregistrementNouvelleObservationBDD,
  recuperationObjectifsDuDomaine,
  recuperationAttendusDelObjectif,
  nouvelAttenduPersonnalise,
  miseaJourObservationAvecAttendu,
  recuperationTitreActivite,
  recuperationAttenduEvalue,
  recuperationCriteres,
  checkEvaluationFaite,
  miseaJourEvaluationsBDD,
  enregistrementEvaluationsBDD,
  verificationLienEleveProf,
  recuperationNomEleveParId,
  recuperationEvaluationParObservation,
  recuperationObservationparId,
  recuperationObjectifparId,
  recuperationDomaineparId,
  recuperationAttenduparIdObservation,
  recuperationDomaines,
  recuperationAttendusPersoDelObjectif
} = require('./model')
const { nettoyageTotal } = require('./../utils')
const logger = require('./../utils/logger')

exports.acceuil = async (req, res, next) => {
  try {
    const titre = 'Bonjour'
    const id = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(id)
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
    const id = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(id)
    const listeEleves = await recuperationElevesParIdUtilisateur(id)
    const listeElevesDesactives = await recuperationElevesDesactivesParIdUtilisateur(id)
    res.render('./applications/fonctionalites/views/exportcsa', { pseudo, titre, listeEleves, listeElevesDesactives })
  } catch (error) {
    logger.error(error)
  }
}

exports.domaine = async (req, res, next) => {
  try {
    const titre = 'Créer une observation'
    const id = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(id)
    const elevesPresents = await verificationPresenceEleves(id)
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
    const titreActivite = nettoyageTotal(req.body.titre)
    const description = nettoyageTotal(req.body.description)
    const domaine = req.body.domaine
    const idObservation = await enregistrementNouvelleObservationBDD(idUtilisateur,
      titreActivite,
      description)

    const objectifsDuDomaine = await recuperationObjectifsDuDomaine(domaine)
    const creationArborescenceReferentiel = async (objectifsDuDomaine) => {
      // on utilise map car forEach ne fonctionne pas avec await
      const arborescenceItems = await objectifsDuDomaine.map(async (objectif) => {
        const idObjectif = objectif.id
        const attendusDelObjectif = await recuperationAttendusDelObjectif(idObjectif)
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
      const idAttenduPersonnalise = await nouvelAttenduPersonnalise(idUtilisateur, attenduPersonnalise, idObjectif)
      await miseaJourObservationAvecAttendu(idObservation, idAttenduPersonnalise[0], 0)
    } else {
      await miseaJourObservationAvecAttendu(idObservation, idAttendu, 1)
    }

    const listeEleves = await recuperationElevesParIdUtilisateur(idUtilisateur)
    const titreActivite = await recuperationTitreActivite(idObservation)
    const attenduEvalue = await recuperationAttenduEvalue(idObservation)
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
    const check = await checkEvaluationFaite(idObservation, idEleve, idCritere)
    if (check) {
      await miseaJourEvaluationsBDD(idObservation, idEleve, idCritere)
      res.json({ message: 'maj' })
    } else {
      await enregistrementEvaluationsBDD(idObservation, idEleve, idCritere)
      res.json({ message: 'evalue' })
    }
  } catch (error) {
    logger.error(error)
  }
}

exports.parents = async (req, res, next) => {
  try {
    const titre = 'Gestion des parents'
    const id = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    logger.error(error)
  }
}

exports.partage = async (req, res, next) => {
  try {
    const titre = 'Partage d\'élèves'
    const id = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    logger.error(error)
  }
}

exports.suivis = async (req, res, next) => {
  try {
    const titre = 'Points de suivi'
    const id = req.session.utilisateur
    const pseudo = await recuperationPseudoParIdUtilisateur(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
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

    const evaluationsDelEleve = await recuperationEvaluationParObservation(idEleve)

    /* de l'évalaution on remonte l'arborescence */
    const creationArborescenceCarnetParEvaluation = async (evaluationsDelEleve) => {
      const elementArborescenceCarnet = await evaluationsDelEleve.map(async (evaluation) => {
        const idObservation = evaluation.idObservation
        const infosObservation = await recuperationObservationparId(idObservation)

        const infosAttendu = await recuperationAttenduparIdObservation(idObservation)

        const objectif = infosAttendu[0].idObjectif
        const infosObjectif = await recuperationObjectifparId(objectif)

        const domaine = infosObjectif[0].idDomaine
        const infosDomaine = await recuperationDomaineparId(domaine)

        const object = { domaine: infosDomaine[0], objectif: infosObjectif[0], attendu: infosAttendu[0], observation: infosObservation[0], evaluation: evaluation.idCritere }
        return object
      })
      const arborescenceCarnet = await Promise.all(elementArborescenceCarnet)
      return arborescenceCarnet
    }
    const retourParEvaluation = await creationArborescenceCarnetParEvaluation(evaluationsDelEleve)

    /* on descend l'arborescence vers l'évaluation */
    /* 
    sortie désirée
    [domaine,domaine]
    {iddomaine: 1, domaine:"blavbla", [objectifs,objectifs ]}
                                       {idobjectif: 22, objectifs:"blabla"  }
*/
    /*
        const creationArborescenceCarnetParStructure = async (evaluationsDelEleve) => {
          const domaines = await recuperationDomaines()
          domaines.map(async (domaine) => {
            const objectifs = await recuperationObjectifsDuDomaine(domaine.id)
            objectifs.map(async (objectif) => {
              const attendus = await recuperationAttendusDelObjectif(objectif.id)
              const attendusPerso = await recuperationAttendusPersoDelObjectif(objectif.id)
              console.log(attendusPerso);
    
            })
          })
        }
        const retourParStructure = await creationArborescenceCarnetParStructure(evaluationsDelEleve)
        console.log(retourParStructure)
    */
    res.render('./applications/fonctionalites/views/carnetEleve', { pseudo, titre, retourParEvaluation })
  } catch (error) {
    logger.error(error)
  }
}
