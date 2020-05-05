'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { domaine, nouvelleObservationDomaine, nouvelleObservationObjetAtt } = require('./../controller')

router.get('/domaine', siAuthentifie, domaine)
router.post('/objectif', siAuthentifie, nouvelleObservationDomaine)
router.post('/evaluation', siAuthentifie, nouvelleObservationObjetAtt)

module.exports = router
