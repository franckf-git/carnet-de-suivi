'use strict'
const config = require('./../')

const core = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.SQLITE_CORE
  },
  useNullAsDefault: true
})

module.exports = core
