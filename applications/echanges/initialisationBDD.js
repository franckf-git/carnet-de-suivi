'use strict'

const echanges = require('./../../config/basededonnees/echanges')
exports.initialisationBDDechanges = () => {
  echanges.schema.hasTable('suggestions')
    .then((exists) => {
      if (!exists) {
        return echanges.schema.createTable('suggestions', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idUtilisateur')
          table.string('texteSuggestion')
          table.timestamp('enregistrement')
            .defaultTo(echanges.fn.now())
        })
      }
    })
  echanges.schema.hasTable('messages')
    .then((exists) => {
      if (!exists) {
        return echanges.schema.createTable('messages', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idUtilisateur')
          table.string('texteMessage')
          table.boolean('annonce')
            .defaultTo(0)
          table.timestamp('enregistrement')
            .defaultTo(echanges.fn.now())
        })
      }
    })
}
