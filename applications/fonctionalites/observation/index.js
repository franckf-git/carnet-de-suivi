'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../../middlewares/cookiesSessions')
const { domaine } = require('./../controller')

router.get('/domaine', siAuthentifie, domaine)

router.post('/domaine', siAuthentifie, async (req, res, next) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
