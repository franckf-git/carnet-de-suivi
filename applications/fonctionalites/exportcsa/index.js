'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { exportcsa, carnetdesuivi } = require('./controller')

router.get('/', siAuthentifie, exportcsa)
router.get('/eleve/:id', siAuthentifie, carnetdesuivi)

module.exports = router
