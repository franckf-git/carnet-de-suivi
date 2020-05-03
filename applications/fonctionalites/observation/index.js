'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { domaine, nouvelleObservationDomaine } = require('./../controller')

router.get('/domaine', siAuthentifie, domaine)
router.post('/domaine', siAuthentifie, nouvelleObservationDomaine)

module.exports = router
