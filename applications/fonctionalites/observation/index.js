'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { observation } = require('./../controller')

router.get('/', siAuthentifie, observation)
router.get('/oral', siAuthentifie, observation)
router.get('/ecrit', siAuthentifie, observation)
router.get('/physique', siAuthentifie, observation)
router.get('/artistique', siAuthentifie, observation)
router.get('/construire', siAuthentifie, observation)
router.get('/explore', siAuthentifie, observation)

module.exports = router
