'use strict'
const config = require('./../')

const echanges = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.SQLITE_ECHANGES
  },
  useNullAsDefault: true
})

module.exports = echanges
