'use strict'
const config = require('./../')

const statistiques = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.SQLITE_STATS
  },
  useNullAsDefault: true
})

module.exports = statistiques
