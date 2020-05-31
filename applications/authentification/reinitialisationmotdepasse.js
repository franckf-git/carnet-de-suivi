'use strict'
const express = require('express')
const router = express.Router()
const { nouveauMotDePasse } = require('./controller')
const { siUuidValide } = require('./controllerErreurs')

router.get('/:uuid', siUuidValide, (req, res) => {
  const uuid = req.params.uuid
  res.render(
    './applications/authentification/views/motdepasseoublieNouveauMotdePasse',
    {
      titre: 'Définissez votre nouveau mot de passe',
      uuid
    }
  )
})
router.post('/:uuid', siUuidValide, nouveauMotDePasse)

module.exports = router
