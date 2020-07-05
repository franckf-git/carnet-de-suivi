'use strict'
const express = require('express')
const router = express.Router()
const { messages, nouveauMessage } = require('./controller')

router.get('/', messages)
router.post('/', nouveauMessage)

module.exports = router
