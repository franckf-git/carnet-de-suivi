'use strict'
const express = require('express')
const router = express.Router()
const { contenuAide } = require('./controller')

router.get('/:intitule', contenuAide)

module.exports = router
