'use strict'
const { recuperationContenuAideBDD } = require('./model')

exports.recuperationContenuAide = async (req, res, next) => {
  try {
    const { intitule } = req.params
    const aAfficherDansLaPage = await recuperationContenuAideBDD(intitule)
    res.json(aAfficherDansLaPage)
  } catch (error) {
    console.error(error)
  }
}
