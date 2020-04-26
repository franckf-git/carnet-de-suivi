'use strict'
const express = require('express')
const router = express.Router()
const { recuperationContenuAide } = require('./controller')

router.get('/:intitule', recuperationContenuAide)

module.exports = router
