'use strict'
const core = require('./../../config/basededonnees/core')
const observations = require('./../../config/basededonnees/observations')

exports.recuperationPseudoParIdUtilisateur = async (id) => {
  try {
    const recherche = await core('utilisateurs')
      .select('pseudo')
      .where({ id })
    const pseudo = recherche[0].pseudo
    return pseudo
  } catch (error) {
    console.error(error)
  }
}

exports.recuperationElevesParIdUtilisateur = async (idUtilisateur) => {
  try {
    const recherche = await observations('eleves')
      .select()
      .where({ idUtilisateur, actif: 1 })
    const listeEleves = recherche
    return listeEleves
  } catch (error) {
    console.error(error)
  }
}
