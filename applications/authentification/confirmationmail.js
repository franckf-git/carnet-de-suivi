'use strict'
const express = require('express')
const router = express.Router()
const { confirmationEmail } = require('./controller')
const { siUuidValide } = require('./controllerErreurs')

router.get('/:uuid', siUuidValide, confirmationEmail)

module.exports = router
