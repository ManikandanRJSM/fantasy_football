const nodemailer = require('nodemailer')
const asynHandler = require('express-async-handler')


const mailConfig = nodemailer.createTransport({
    service: 'gmail',
       auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.MAIL_APP_PWD,
         },
    secure: true,
})

const accountActivationMailer = asynHandler(async (mailData) => {
    const activateURL = `http://localhost:5000/api/activateAccount/${mailData._id.toString()}`
    console.log(activateURL)
    let sendMailData = {
        from: process.env.SMTP_EMAIL,  // sender address
          to: mailData.email,   // list of receivers
          subject: 'FPL Account Activation',
          text: 'That was easy!',
          html: `<b>Hey ${mailData.first_name}! </b> <br> Welcome to FPL Click the link to activate your account ${activateURL}<br/>`,
        };
    return await mailConfig.sendMail(sendMailData)
})

module.exports = { accountActivationMailer }
