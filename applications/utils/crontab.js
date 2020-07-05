'use strict'
const { CronJob } = require('cron')
const { exec } = require('child_process')
const { nettoyageLiensMailsetMdpOublies } = require('./../authentification/model')
const { nettoyageStatistiques } = require('./../statistiques/model')
const logger = require('./logger')

exports.sauvegardeBasedeDonnees = () => {
  const job = new CronJob('0 45 23 * * *', () => {
    const dumpBDD = async (basededonnees) => {
      try {
        await exec(
          `sqlite3 basededonnees/${basededonnees}.sqlite .dump > basededonnees/dumps/${basededonnees}_$(date +%Y-%m-%d).sql`
        )
      } catch (error) {
        logger.error(`error: ${error.message}`)
      }
    }
    dumpBDD('aide')
    dumpBDD('core')
    dumpBDD('statistiques')
    dumpBDD('carnetdesuivi')
    dumpBDD('echanges')
    dumpBDD('referentiel')
  })
  job.start()
}

exports.nettoyageLiensMailsetMdpOublies = () => {
  const job = new CronJob('0 0 0 * * *', () => {
    nettoyageLiensMailsetMdpOublies()
  })
  job.start()
}

exports.nettoyageStatistiques = () => {
  const job = new CronJob('0 0 1 * * *', () => {
    nettoyageStatistiques()
  })
  job.start()
}
