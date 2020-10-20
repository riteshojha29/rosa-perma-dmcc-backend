const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const jobApplicationService = require('./jobApplication.service');
const User = require('../users/user.service');
const constants = require('../_helpers/constants');
const mailer = require('_helpers/sendMail');

// routes
router.post('/submit', submitJobApplication);

module.exports = router;

function submitJobApplication(req, res, next) {
    jobApplicationService.submitJobApplication(req.body)
        .then(user => res.json({
            statusCode: constants.SUCCESS, 
            message:constants.JOB_APPLICATION_SUCCESS
        }),
        generateMembershipCertificate(req.body.jobTitle),
        sendMembershipCertificateToUser(req.body.userid)
    )
        .catch(err => next(res.json({
            statusCode: constants.FAILURE,  
            message:err
        })));
}

function generateMembershipCertificate(jobTitle) {
    var pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('MembershipCertificate.pdf'));
    pdfDoc.text("Welcome to Company as ", 150, 150);
    pdfDoc.text(jobTitle,{ underline: true }, 180, 100)
    pdfDoc.end();
}

function sendMembershipCertificateToUser(userId) {
    User.getUserById(userId)
    .then(userdata => {
        mailer.sendMemberCertificateMail(userdata.email);
    })
    .catch(err => next(res.json({
        statusCode: constants.FAILURE,  
        message:err
    })));
}
