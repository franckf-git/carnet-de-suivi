'use strict'
const { enregistrementInfos } = require('./model')
const logger = require('./../utils/logger')

exports.infos = async (req, res, next) => {
  try {
    const infosClient = req.body
    const ip = req.ip
    const remoteAddress = req.connection.remoteAddress
    const aSauvegarder = { ip, remoteAddress, ...infosClient }
    await enregistrementInfos(aSauvegarder)
    res.status(201).json({ message: 'ok' })
  } catch (error) {
    logger.error(error)
  }
}
