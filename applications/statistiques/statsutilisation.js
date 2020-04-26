'use strict'
const express = require('express')
const router = express.Router()
const { enregistrementInfos } = require('./controller')

router.post('/', enregistrementInfos)

module.exports = router
