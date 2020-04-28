'use strict'
const { CronJob } = require('cron')
const { nettoyageLiensMailsetMdpOubliesBDD } = require('./../authentification/model')
const { nettoyageStatistiquesBDD } = require('./../statistiques/model')

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
