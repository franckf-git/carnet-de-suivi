'use strict'
const { recuperationPseudoParId } = require('./model')

exports.acceuil = async (req, res, next) => {
  try {
    const titre = 'Bonjour'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/acceuil', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}

exports.eleves = async (req, res, next) => {
  try {
    const titre = 'Gestion des élèves'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/eleves', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}

exports.exportcsa = async (req, res, next) => {
  try {
    const titre = 'Export du carnet de suivi'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}

exports.observation = async (req, res, next) => {
  try {
    const titre = 'Créer une observation'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}

exports.parents = async (req, res, next) => {
  try {
    const titre = 'Gestion des parents'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}

exports.partage = async (req, res, next) => {
  try {
    const titre = 'Partage d\'élèves'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}

exports.suivis = async (req, res, next) => {
  try {
    const titre = 'Points de suivi'
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/bientot', { pseudo, titre })
  } catch (error) {
    console.error(error)
  }
}
