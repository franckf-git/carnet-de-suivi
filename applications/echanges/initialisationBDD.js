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
}
