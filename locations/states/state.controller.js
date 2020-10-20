const express = require('express');
const router = express.Router();
const stateService = require('./state.service');

module.exports = router;

// routes
router.get('/:id', getStateListByRegionCode);


function getStateListByRegionCode(req, res, next) {
    stateService.getStateListByRegionCode(req.params.id)
    .then(states => states ? res.json({states}) : res.sendStatus(404))
    .catch(err => next(err));
}

