'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { observation } = require('./../controller')

router.get('/', siAuthentifie, observation)

module.exports = router
