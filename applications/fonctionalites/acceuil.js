'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../middlewares/cookiesSessions')
const { acceuil } = require('./controller')

router.get('/', siAuthentifie, acceuil)

module.exports = router
