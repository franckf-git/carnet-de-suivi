'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { eleves } = require('./../controller')

router.get('/', siAuthentifie, eleves)

module.exports = router
