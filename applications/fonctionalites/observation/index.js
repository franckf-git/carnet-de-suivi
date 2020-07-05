'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie, siAuthentifieAPI } = require('./../../middlewares/cookiesSessions')
const { domaine, nouvelleObservationDomaine, nouvelleObservationChoixAttendu, enregistrementEvaluations } = require('./controller')

router.get('/domaine', siAuthentifie, domaine)
router.post('/objectif', siAuthentifie, nouvelleObservationDomaine)
router.post('/evaluation', siAuthentifie, nouvelleObservationChoixAttendu)
router.post('/enregistrementEvaluations', siAuthentifieAPI, enregistrementEvaluations)

module.exports = router
