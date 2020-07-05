'use strict'
const express = require('express')
const router = express.Router()
const { connexionUtilisateur } = require('./controller')
const { dejaAuthentifie } = require('./../middlewares/cookiesSessions')

router.get('/', dejaAuthentifie, (req, res) => {
  res.render('./applications/authentification/views/connexion', { titre: 'Connexion' })
})
router.post('/', connexionUtilisateur)

module.exports = router
