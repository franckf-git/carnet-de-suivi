'use strict'
const express = require('express')
const router = express.Router()
const { nouveauMotDePasse } = require('./controller')
const { siUUIDvalide } = require('./controllerErreurs')

router.get('/:uuid', siUUIDvalide, (req, res) => {
  const uuid = req.params.uuid
  res.render(
    './applications/authentification/views/motdepasseoublieNouveauMotdePasse', {
      titre: 'Définissez votre nouveau mot de passe',
      uuid
    }
  )
})
router.post('/:uuid', siUUIDvalide, nouveauMotDePasse)

module.exports = router
