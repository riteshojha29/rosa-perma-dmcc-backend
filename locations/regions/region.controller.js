const express = require('express');
const router = express.Router();
const regionService = require('./region.service');

module.exports = router;

// routes
router.get('/:id', getRegionListByCountry);


function getRegionListByCountry(req, res, next) {
    regionService.getRegionListByCountryCode(req.params.id)
    .then(regions => regions ? res.json({regions}) : res.sendStatus(404))
    .catch(err => next(err));
}