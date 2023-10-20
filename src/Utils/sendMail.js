const nodemailer = require('nodemailer')
const asynHandler = require('express-async-handler')
const event = require('events')

const sendMailEmmiter = new event.EventEmitter()


const mailConfig = nodemailer.createTransport({
    service: 'gmail',
       auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.MAIL_APP_PWD,
         },
    secure: true,
})

sendMailEmmiter.on('accountActivationMailer', (mailData) => {
    const activateURL = `http://localhost:${process.env.PORT}/api/activateAccount/${mailData._id.toString()}`
    console.log(activateURL)
    let sendMailData = {
        from: process.env.SMTP_EMAIL,  // sender address
          to: mailData.email,   // list of receivers
          subject: 'FPL Account Activation',
          text: 'That was easy!',
          html: `<b>Hey ${mailData.first_name}! </b> <br> Welcome to FPL Click the link to activate your account ${activateURL}<br/>`,
        };
        return mailConfig.sendMail(sendMailData)
})

module.exports = { sendMailEmmiter }
