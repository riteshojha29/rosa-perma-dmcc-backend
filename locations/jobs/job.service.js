const db = require('_helpers/db');
const Job = db.Job;

module.exports = {
    getJobListByTownCode
};

async function getJobListByTownCode(id) {
    return await Job.find({townCode : id});
}