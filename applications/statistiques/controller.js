'use strict'
const { enregistrementInfos } = require('./model')
const logger = require('./../utils/logger')

exports.infos = async (req, res, next) => {
  try {
    if (!req.body.uuidStatsAnonym) {
      return res.status(403).json({ message: 'enregistrement refusé - pas de uuid' })
    }
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
