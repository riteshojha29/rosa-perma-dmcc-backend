const express = require('express');
const router = express.Router();
const jobService = require('./job.service');

module.exports = router;

// routes
router.get('/:id', getJobListByTownCode);

function getJobListByTownCode(req, res, next) {
    jobService.getJobListByTownCode(req.params.id)
    .then(jobs => jobs ? res.json({jobs}) : res.sendStatus(404))
    .catch(err => next(err));
}
