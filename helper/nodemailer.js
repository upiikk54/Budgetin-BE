const nodemailer = require('nodemailer');

exports.passwordResetEmail = emailData => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'appbudgetin@gmail.com',
            pass: 'lkgndgfhcfdeheeu'
        },
    });
    
    return (
        transporter.sendMail(emailData)
        .then(info =>  console.log(`E-mail sent: ${info.messageId}`))
        .catch(err =>  console.log(`There is an error: ${err}`))

    );
}
