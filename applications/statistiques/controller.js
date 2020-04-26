'use strict'
const { enregistrementInfosBDD } = require('./model')

exports.enregistrementInfos = async (req, res, next) => {
  try {
    const infosClient = req.body
    const ip = req.ip
    const remoteAddress = req.connection.remoteAddress
    const aSauvegarder = { ip, remoteAddress, ...infosClient }
    await enregistrementInfosBDD(aSauvegarder)
  } catch (error) {
    console.error(error)
  }
}
