'use strict'
const { CronJob } = require('cron')
const { nettoyageLiensMailsetMdpOubliesBDD } = require('./../authentification/model')

exports.nettoyageLiensMailsetMdpOublies = () => {
  const job = new CronJob('0 0 0 * * *', () => {
    nettoyageLiensMailsetMdpOubliesBDD()
  })
  job.start()
}
