const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const constants = require('../_helpers/constants');

// routes
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/verifyOTP', verifyOTP);

module.exports = router;

function login(req, res, next) {
    userService.login(req.body)
        .then(user => res.json({
            statusCode: constants.SUCCESS, 
            message: constants.LOGIN_SUCCESS, 
            data: user
        }))
        .catch(err => next(res.json({
            statusCode: constants.FAILURE,  
            message:err
        })));
}

function register(req, res, next) {
    userService.register(req.body)
        .then(user => res.json({
            statusCode: constants.SUCCESS, 
            message:constants.USER_CREATED,
            data: user
        }))
        .catch(err => next(res.json({
            statusCode: constants.FAILURE,  
            message:err
        })));
}

function logout (req, res, next) {
    userService.logout(req.body)
    .then(()=> res.json({

    }))
    .catch(err => next(res.json({
        statusCode: constants.FAILURE,  
        message:err
    })));
}

function verifyOTP(req, res, next) {
    userService.verifyOTP(req.body)
    .then(() => res.json({
        statusCode: constants.SUCCESS, 
        message:constants.OTP_VERIFICATION_SUCCESS
    }))
    .catch(err => next(res.json({
        statusCode: constants.FAILURE,  
        message:err
    })));
}
