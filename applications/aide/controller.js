'use strict'
const { recuperationContenuAide } = require('./model')
const logger = require('./../utils/logger')

exports.contenuAide = async (req, res, next) => {
  try {
    const { intitule } = req.params
    const aAfficherDansLaPage = await recuperationContenuAide(intitule)
    res.json(aAfficherDansLaPage)
  } catch (error) {
    logger.error(error)
  }
}
