'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifieAPI } = require('./../middlewares/cookiesSessions')

router.get('/', siAuthentifieAPI, (req, res) => {
  res.json({ message: 'Bienvenue dans le côté securisé de l\'api' })
})

module.exports = router
