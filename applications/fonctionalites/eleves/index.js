'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { eleves, editionEleves, ajoutEleve } = require('./controller')

router.get('/', siAuthentifie, eleves)
router.post('/edition/:id', siAuthentifie, editionEleves)
router.post('/ajout', siAuthentifie, ajoutEleve)

module.exports = router
