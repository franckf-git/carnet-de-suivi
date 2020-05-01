'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { eleves, editionEleves } = require('./../controller')

router.get('/', siAuthentifie, eleves)
router.post('/edition/:id', siAuthentifie, editionEleves)

module.exports = router
