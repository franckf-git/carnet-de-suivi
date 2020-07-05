'use strict'
const express = require('express')
const router = express.Router()
const { suggestion, nouvelleSuggestion } = require('./controller')

router.get('/', suggestion)
router.post('/', nouvelleSuggestion)

module.exports = router
