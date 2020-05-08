'use strict'
const { recuperationContenuAideBDD } = require('./model')
const logger = require('./../utils/logger')

exports.recuperationContenuAide = async (req, res, next) => {
  try {
    const { intitule } = req.params
    const aAfficherDansLaPage = await recuperationContenuAideBDD(intitule)
    res.json(aAfficherDansLaPage)
  } catch (error) {
    logger.error(error)
  }
}
