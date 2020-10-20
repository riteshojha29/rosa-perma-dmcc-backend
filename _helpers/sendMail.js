const nodemailer = require('nodemailer');

const sender = 'SENDER EMAIL ADDRESS';

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: sender,
        pass: 'SENDER EMAIL PASSWORD'
    }
});

module.exports = {
    sendMemberCertificateMail,
    sendOTP
};

async function sendOTP(userEmail, otp) {
    const message = {
        from: sender,
        to: userEmail,
        subject: 'OTP',
        text: 'OTP for registration '+ otp
    };

    dispatchMail(message);
}

async function sendMemberCertificateMail(userEmail) {
    const message = {
        from: sender,
        to: userEmail,
        subject: 'Certificate of Membership',
        text: 'Happy onboarding',
        attachments:[{
            path: './MembershipCertificate.pdf'
        }]
    };

    dispatchMail(message);
}

function dispatchMail(message) {
    transport.sendMail(message, function(err) {
        if(err) {
            console.log('email delivery failed -> ' + err);
            return;
        }
        console.log('email sent');
    });
}

