'use strict'
const config = require('./../')

const observations = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.SQLITE_OBSERVATIONS
  },
  useNullAsDefault: true
})

module.exports = observations
