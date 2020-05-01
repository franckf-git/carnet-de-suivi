'use strict'
const core = require('./../../config/basededonnees/core')

exports.initialisationBDDAuthentification = () => {
  core.schema.hasTable('utilisateurs')
    .then((exists) => {
      if (!exists) {
        return core.schema.createTable('utilisateurs', (table) => {
          table.increments()
            .primary()
            .index()
          table.string('pseudo')
          table.string('email')
            .unique()
            .index()
          table.string('motdepasse')
          table.boolean('confirme')
            .defaultTo(0)
          table.timestamp('enregistrement')
            .defaultTo(core.fn.now())
          table.timestamp('derniereConnexion')
            .defaultTo(core.fn.now())
        })
      }
    })

  core.schema.hasTable('confirmationMail')
    .then((exists) => {
      if (!exists) {
        return core.schema.createTable('confirmationMail', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idUtilisateur')
          table.foreign('idUtilisateur')
            .references('utilisateurs.id')
          table.boolean('utilise')
            .defaultTo(0)
          table.uuid('uuid')
            .unique()
            .index()
          table.timestamp('envoiMail')
            .defaultTo(core.fn.now())
        })
      }
    })

  core.schema.hasTable('reinitialisationMDP')
    .then((exists) => {
      if (!exists) {
        return core.schema.createTable('reinitialisationMDP', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idUtilisateur')
          table.foreign('idUtilisateur')
            .references('utilisateurs.id')
          table.boolean('utilise')
            .defaultTo(0)
          table.uuid('uuid')
            .unique()
            .index()
          table.timestamp('envoiMail')
            .defaultTo(core.fn.now())
        })
      }
    })
}
