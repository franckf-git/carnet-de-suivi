'use strict'
const aide = require('./../../config/basededonnees/aide')

exports.initialisationBDDAide = () => {
  aide.schema.hasTable('aideDansPage')
    .then((exists) => {
      if (!exists) {
        return aide.schema.createTable('aideDansPage', (table) => {
          table.string('intitule')
            .index()
          table.string('texte')
        })
      }
    })
}
