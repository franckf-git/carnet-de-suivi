'use strict'
const core = require('./../../config/basededonnees/core')

exports.recuperationPseudoParId = async (id) => {
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
