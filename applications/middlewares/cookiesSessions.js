'use strict'

exports.siAuthentifie = async (req, res, next) => {
  if (req.session.user && req.session.cookie) {
    return next()
  } else {
    res.redirect('/connexion')
  }
}

exports.dejaAuthentifie = async (req, res, next) => {
  if (req.session.user && req.session.cookie) {
    res.redirect('/acceuil')
  } else {
    return next()
  }
}

exports.siAuthentifieAPI = async (req, res, next) => {
  if (req.session.user && req.session.cookie) {
    return next()
  } else {
    res.status(401)
      .json({ message: 'Vous devez vous connecter pour accèder à cette ressource.' })
  }
}
