'use strict'
const express = require('express')
const router = express.Router()
const { suggestion } = require('./controller')

router.get('/', suggestion)

module.exports = router
