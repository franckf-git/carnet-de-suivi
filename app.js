'use strict'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const config = require('./config')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

const app = express()

// view engine setup
app.set('views', path.join(__dirname, './'))
app.set('view engine', 'ejs')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

// cookies sessions
const optionsSession = {
  key: `cookies_${config.DOMAIN}`,
  secret: config.SECRET_SESSION,
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: true,
    httpOnly: true,
    expires: 60000000,
    maxAge: 60000000
  }
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  optionsSession.cookie.secure = true // only on https
}
app.use(session(optionsSession))

// ROUTES
if (app.get('env') === 'maintenance') {
  app.use((req, res) => res.redirect('/maintenance'))
}
app.use('/connexion', require('./applications/authentification/connexion'))
app.use('/deconnexion', require('./applications/authentification/deconnexion'))
app.use('/enregistrement', require('./applications/authentification/enregistrement'))
app.use('/motdepasseoublie', require('./applications/authentification/motdepasseoublie'))
app.use('/confirmationmail', require('./applications/authentification/confirmationmail'))
app.use('/reinitialisationmotdepasse', require('./applications/authentification/reinitialisationmotdepasse'))
app.use('/statsutilisation', require('./applications/statistiques/statsutilisation'))
app.use('/aide', require('./applications/aide/api'))
app.use('/suggestion', require('./applications/echanges/suggestion'))
// ROUTES siAuthentifie
app.use('/acceuil', require('./applications/fonctionalites/acceuil'))
app.use('/observation', require('./applications/fonctionalites/observation/'))
app.use('/eleves', require('./applications/fonctionalites/eleves/'))
app.use('/parents', require('./applications/fonctionalites/parents/'))
app.use('/partage', require('./applications/fonctionalites/partage/'))
app.use('/exportcsa', require('./applications/fonctionalites/exportcsa/'))
app.use('/suivis', require('./applications/fonctionalites/suivis/'))

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  if (err.status === 404) {
    res.redirect('/404')
  }
})

module.exports = app
