'use strict'
const config = require('./../')

const referentiel = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: config.SQLITE_REFERENTIEL
    },
    useNullAsDefault: true
})

module.exports = referentiel
