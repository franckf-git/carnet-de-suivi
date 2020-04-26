'use strict'
const express = require('express')
const router = express.Router()
const { siAuthentifie } = require('./../middlewares/cookiesSessions')

router.get('/', siAuthentifie, (req, res) => {
  res.render('./applications/fonctionalites/views/tableauDeBord', { id: req.session.user })
})

module.exports = router
