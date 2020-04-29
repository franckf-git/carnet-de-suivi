'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { suivis } = require('./../controller')

router.get('/', siAuthentifie, suivis)

module.exports = router
