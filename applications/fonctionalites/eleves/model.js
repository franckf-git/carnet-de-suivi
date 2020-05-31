'use strict'
const observations = require('./../../../config/basededonnees/observations')
const logger = require('./../../utils/logger')

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

exports.reactivationEleve = async (id) => {
  try {
    await observations('eleves')
      .update({ actif: 1 })
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
