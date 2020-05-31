'use strict'
const config = require('./../')

const carnetdesuivi = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: config.SQLITE_CARNETDESUIVI
  },
  useNullAsDefault: true
})

module.exports = carnetdesuivi
