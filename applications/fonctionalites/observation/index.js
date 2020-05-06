'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { domaine, nouvelleObservationDomaine, nouvelleObservationChoixAttendu } = require('./../controller')

router.get('/domaine', siAuthentifie, domaine)
router.post('/objectif', siAuthentifie, nouvelleObservationDomaine)
router.post('/evaluation', siAuthentifie, nouvelleObservationChoixAttendu)

module.exports = router
