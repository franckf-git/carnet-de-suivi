'use strict'
const express = require('express')
const router = express.Router()
const { confirmationEmail } = require('./controller')
const { siUUIDvalide } = require('./controllerErreurs')

router.get('/:uuid', siUUIDvalide, confirmationEmail)

module.exports = router
