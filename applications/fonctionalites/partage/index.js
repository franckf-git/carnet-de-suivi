'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { partage } = require('./../controller')

router.get('/', siAuthentifie, partage)

module.exports = router
