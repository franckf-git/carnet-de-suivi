'use strict'
const express = require('express')
const router = express.Router()
const config = require('./../../config')

router.get('/', (req, res) => {
  if (req.session.utilisateur && req.session.cookie) {
    res.clearCookie(`cookies_${config.DOMAIN}`)
    res.redirect('/')
  } else {
    res.redirect('/connexion')
  }
})

module.exports = router
