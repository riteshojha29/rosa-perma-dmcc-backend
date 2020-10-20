const express = require('express');
const router = express.Router();
const countryService = require('./country.service');

module.exports = router;

// routes
router.get('/', getCountryList);


function getCountryList(req, res, next) {
    countryService.getCountryList()
        .then(countries => res.json({countries}))
        .catch(err => next(err));
}