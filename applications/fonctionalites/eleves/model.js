'use strict'
const carnetdesuivi = require('./../../../config/basededonnees/carnetdesuivi')
const logger = require('./../../utils/logger')

exports.miseajourEleve = async (id, nom) => {
  try {
    await carnetdesuivi('eleves')
      .update({ nom })
      .where({ id })
  } catch (error) {
    logger.error(error)
  }
}

exports.desactivationEleve = async (id) => {
  try {
    await carnetdesuivi('eleves')
      .update({ actif: 0 })
      .where({ id })
  } catch (error) {
    logger.error(error)
  }
}

exports.reactivationEleve = async (id) => {
  try {
    await carnetdesuivi('eleves')
      .update({ actif: 1 })
      .where({ id })
  } catch (error) {
    logger.error(error)
  }
}

exports.ajoutEleve = async (nom, idUtilisateur) => {
  try {
    await carnetdesuivi('eleves').insert({ nom, idUtilisateur })
  } catch (error) {
    logger.error(error)
  }
}
