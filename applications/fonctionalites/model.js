'use strict'
const core = require('./../../config/basededonnees/core')
const observations = require('./../../config/basededonnees/observations')
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
