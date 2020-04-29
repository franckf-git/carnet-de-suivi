'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { exportcsa } = require('./../controller')

router.get('/', siAuthentifie, exportcsa)

module.exports = router
