'use strict'
const observations = require('./../../config/basededonnees/observations')

exports.initialisationBDDObservations = () => {
  observations.schema.hasTable('eleves')
    .then((exists) => {
      if (!exists) {
        return observations.schema.createTable('eleves', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idUtilisateur')
          table.string('nom')
          table.boolean('actif')
            .defaultTo(1)
          table.timestamp('enregistrement')
            .defaultTo(observations.fn.now())
        })
      }
    })
}
