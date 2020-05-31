'use strict'
const {
  recuperationPseudoParIdUtilisateur,
  recuperationElevesParIdUtilisateur,
  recuperationElevesDesactivesParIdUtilisateur
} = require('./../model')
const {
  verificationLienEleveProf,
  recuperationNomEleveParId,
  recuperationEvaluationParEleve,
  recuperationObservationParId,
  recuperationObjectifParId,
  recuperationDomaineParId,
  recuperationAttenduParObservation
} = require('./model')
const { creationArborescenceCarnetParStructure } = require('./utils')
const logger = require('./../../utils/logger')

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
