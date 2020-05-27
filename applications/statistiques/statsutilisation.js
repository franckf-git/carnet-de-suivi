'use strict'
const express = require('express')
const router = express.Router()
const { infos } = require('./controller')

router.post('/', infos)

module.exports = router
