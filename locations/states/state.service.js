const db = require('_helpers/db');
const State = db.State;

module.exports = {
    getStateListByRegionCode
};

async function getStateListByRegionCode(id) {
    return await State.find({reagionCode : id});
}

