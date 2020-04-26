'use strict'
const statistiques = require('./../../config/basededonnees/statistiques')

exports.initialisationBDDStatistiques = () => {
  statistiques.schema.hasTable('infosUtilisation')
    .then((exists) => {
      if (!exists) {
        return statistiques.schema.createTable('infosUtilisation', (table) => {
          table.increments()
            .primary()
            .index()
          table.string('ip')
          table.string('remoteAddress')
          table.uuid('uuid')
            .unique()
            .index()
          table.uuid('uuidStatsAnonym')
            .index()
          table.string('doNotTrack')
          table.string('userAgent')
          table.string('language')
          table.string('pathname')
          table.integer('width')
          table.integer('height')
          table.string('orientation')
          table.integer('duration')
          table.timestamp('ouverture')
            .defaultTo(statistiques.fn.now())
        })
      }
    })
}
