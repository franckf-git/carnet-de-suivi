'use strict'
const sanitizeHtml = require('sanitize-html')
const sanitize = require('sanitize-filename')

exports.nettoyageTotal = (texteANettoyer) => {
  const nettoyageHtml = sanitizeHtml(texteANettoyer, {
    allowedTags: [],
    allowedAttributes: {},
    allowedClasses: {},
    allowedSchemes: []
  })
  const nettoyageCaracters = sanitize(nettoyageHtml)
  return nettoyageCaracters
}
