'use strict'
const config = require('./../')

const aide = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.SQLITE_AIDE
  },
  useNullAsDefault: true
})

module.exports = aide
