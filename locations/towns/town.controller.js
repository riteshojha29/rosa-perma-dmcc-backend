const express = require('express');
const router = express.Router();
const townService = require('./town.service');

module.exports = router;

// routes
router.get('/:id', getTownListByStateCode);
router.post('/loadData', loadData)
router.get('/', getAllTowns);

function getTownListByStateCode(req, res, next) {
    townService.getTownListByStateCode(req.params.id)
    .then(towns=> towns ? res.json({towns}) : res.sendStatus(404))
    .catch(err => next(err));
}

function loadData(req, res, next) {
    townService.loadData(req.body)
        .then(() => res.json({}))
        .catch(err => next(res.json({
            statusCode: constants.FAILURE,  
            message:err
        })));
}

function getAllTowns(req, res, next) {
    townService.getAllTowns()
        .then(towns => res.json({towns}))
        .catch(err => next(err));
}