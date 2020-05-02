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
            .index()
          table.string('nom')
          table.boolean('actif')
            .defaultTo(1)
          table.timestamp('enregistrement')
            .defaultTo(observations.fn.now())
        })
      }
    })
}

const referentiel = require('./../../config/basededonnees/referentiel')

exports.initialisationBDDReferentiel = () => {
  referentiel.schema.hasTable('domaines')
    .then((exists) => {
      if (!exists) {
        return referentiel.schema.createTable('domaines', (table) => {
          table.increments()
            .primary()
            .index()
          table.string('domaine')
        })
      }
    })
  referentiel.schema.hasTable('objectifs')
    .then((exists) => {
      if (!exists) {
        return referentiel.schema.createTable('objectifs', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idDomaine')
            .index()
          table.foreign('idDomaine')
            .references('domaines.id')
          table.string('objectif')
        })
      }
    })
  referentiel.schema.hasTable('attendus')
    .then((exists) => {
      if (!exists) {
        return referentiel.schema.createTable('attendus', (table) => {
          table.increments()
            .primary()
            .index()
          table.integer('idObjectif')
            .index()
          table.foreign('idObjectif')
            .references('objectifs.id')
          table.string('attendu')
        })
      }
    })
}
