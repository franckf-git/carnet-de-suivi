'use strict'
const ejs = require('ejs')
const path = require('path')
const nodeMailer = require('nodemailer')
const config = require('./../../config')
const { MAIL } = require('./../../config')
const logger = require('./logger')

exports.envoiMailTemplate = async (choixTemplateAEnvoyer, options) => {
  try {
    const mailDeDestination = options.email
    const fichierDeTemplate = await path.join(__dirname,
      `./../views/mails/${choixTemplateAEnvoyer}.ejs`)
    const renduHtmlaEnvoyer = await ejs.renderFile(fichierDeTemplate, options)

    const connecteurBoiteMail = await nodeMailer.createTransport({
      host: MAIL.SMTP,
      port: MAIL.PORT,
      secure: true,
      auth: {
        user: MAIL.USER,
        pass: MAIL.PASS
      }
    })

    const mailRetour = `ne-pas-repondre@${config.DOMAIN}`
    const mailOptions = {
      from: `${config.DOMAIN} <${mailRetour}>`,
      to: mailDeDestination,
      subject: `${options.objet}`,
      html: renduHtmlaEnvoyer
    }

    await connecteurBoiteMail.sendMail(mailOptions, (error, data) => {
      if (error) {
        logger.error(error)
      }
    })
  } catch (error) {
    logger.error(error)
  }
}
