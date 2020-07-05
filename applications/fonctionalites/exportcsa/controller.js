'use strict'
const {
  recuperationPseudoParIdUtilisateur,
  recuperationElevesParIdUtilisateur,
  recuperationElevesDesactivesParIdUtilisateur,
  recuperationCriteres
} = require('./../model')
const {
  recuperationNomEleveParId,
  recuperationEvaluationParEleve,
  verificationLienEleveProf
} = require('./model')
const { creationArborescenceCarnetParEvaluation } = require('./utils')
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

    const retourParEvaluation = await creationArborescenceCarnetParEvaluation(evaluationsDelEleve)
    const criteres = await recuperationCriteres()

    res.render('./applications/fonctionalites/views/carnetEleve', { pseudo, titre, retourParEvaluation, criteres })
  } catch (error) {
    logger.error(error)
  }
}
