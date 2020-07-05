'use strict'
const express = require('express')
const router = express.Router()
const { enregistreNouveauUtilisateur } = require('./controller')
const { dejaAuthentifie } = require('./../middlewares/cookiesSessions')

router.get('/', dejaAuthentifie, (req, res) => {
  res.render('./applications/authentification/views/enregistrement', { titre: 'Enregistrement' })
})
router.post('/', enregistreNouveauUtilisateur)

module.exports = router
