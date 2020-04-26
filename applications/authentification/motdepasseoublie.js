'use strict'
const express = require('express')
const router = express.Router()
const { reinitialisationMotDePasse } = require('./controller')
const { dejaAuthentifie } = require('./../middlewares/cookiesSessions')

router.get('/', dejaAuthentifie, (req, res) => {
  res.render('./applications/authentification/views/motdepasseoublie', { titre: 'Réinitialisation' })
})
router.post('/', reinitialisationMotDePasse)

module.exports = router
