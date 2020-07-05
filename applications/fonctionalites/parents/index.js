'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { parents } = require('./../controller')

router.get('/', siAuthentifie, parents)

module.exports = router
