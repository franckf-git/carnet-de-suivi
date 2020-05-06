'use strict'
const core = require('./../../config/basededonnees/core')
const observations = require('./../../config/basededonnees/observations')
const referentiel = require('./../../config/basededonnees/referentiel')

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
      .orderBy('nom')
    const listeEleves = recherche
    return listeEleves
  } catch (error) {
    console.error(error)
  }
}

exports.miseajourEleve = async (id, nom) => {
  try {
    await observations('eleves')
      .update({ nom })
      .where({ id })
  } catch (error) {
    console.error(error)
  }
}

exports.desactivationEleve = async (id) => {
  try {
    await observations('eleves')
      .update({ actif: 0 })
      .where({ id })
  } catch (error) {
    console.error(error)
  }
}

exports.ajoutEleveBDD = async (nom, idUtilisateur) => {
  try {
    await observations('eleves').insert({ nom, idUtilisateur })
  } catch (error) {
    console.error(error)
  }
}

exports.verificationPresenceEleves = async (idUtilisateur) => {
  try {
    const recherche = await observations('eleves')
      .select()
      .where({ idUtilisateur, actif: 1 })
      .limit(1)
    if (typeof recherche[0] === 'undefined') {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

exports.enregistrementNouvelleObservationBDD = async (idUtilisateur, titre, description, idAttendu) => {
  try {
    return await observations('observations').insert({ idUtilisateur, titre, description, idAttendu })
  } catch (error) {
    console.error(error)
  }
}

exports.recuperationObjectifsDuDomaine = async (idDomaine) => {
  try {
    const recherche = await referentiel('objectifs').select().where({ idDomaine })
    return recherche
  } catch (error) {
    console.error(error)
  }
}

exports.recuperationAttendusDelObjectif = async (idObjectif) => {
  try {
    const recherche = await referentiel('attendus').select().where({ idObjectif })
    return recherche
  } catch (error) {
    console.error(error)
  }
}

exports.nouvelAttenduPersonnalise = async (idUtilisateur, attenduPersonnalise, idObjectif) => {
  try {
    return await observations('attendusPersonnalises').insert({
      idUtilisateur,
      idObjectif,
      attendu: attenduPersonnalise
    })
  } catch (error) {
    console.error(error)
  }
}

exports.miseaJourObservationAvecAttendu = async (idObservation, idAttendu, referentielOfficiel) => {
  try {
    return await observations('observations').update({ idAttendu, referentielOfficiel }).where({ id: idObservation })
  } catch (error) {
    console.error(error)
  }
}
