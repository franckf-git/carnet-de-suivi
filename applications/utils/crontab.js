'use strict'
const { CronJob } = require('cron')
const { exec } = require('child_process')
const { nettoyageLiensMailsetMdpOubliesBDD } = require('./../authentification/model')
const { nettoyageStatistiquesBDD } = require('./../statistiques/model')

exports.sauvegardeBasedeDonnees = () => {
  const job = new CronJob('0 45 23 * * *', () => {
    const dumpBDD = async (basededonnees) => {
      try {
        await exec(
          `sqlite3 basededonnees/${basededonnees}.sqlite .dump > basededonnees/dumps/${basededonnees}_$(date +%Y-%m-%d).sql`
        )
      } catch (error) {
        console.log(`error: ${error.message}`)
      }
    }
    dumpBDD('aide')
    dumpBDD('core')
    dumpBDD('statistiques')
    dumpBDD('observations')
    dumpBDD('referentiel')
  })
  job.start()
}

exports.nettoyageLiensMailsetMdpOublies = () => {
  const job = new CronJob('0 0 0 * * *', () => {
    nettoyageLiensMailsetMdpOubliesBDD()
  })
  job.start()
}

exports.nettoyageStatistiques = () => {
  const job = new CronJob('0 0 1 * * *', () => {
    nettoyageStatistiquesBDD()
  })
  job.start()
}
