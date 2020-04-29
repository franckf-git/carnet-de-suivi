'use strict'
const { recuperationPseudoParId } = require('./model')

exports.acceuil = async (req, res, next) => {
  try {
    const id = req.session.user
    const pseudo = await recuperationPseudoParId(id)
    res.render('./applications/fonctionalites/views/acceuil', { pseudo })
  } catch (error) {
    console.error(error)
  }
}
