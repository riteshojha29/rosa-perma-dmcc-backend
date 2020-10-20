const db = require('_helpers/db');
const Region = db.Region;

module.exports = {
    getRegionListByCountryCode
};

async function getRegionListByCountryCode(id) {
    return await Region.find({countryCode : id});
}