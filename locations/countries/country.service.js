const db = require('_helpers/db');
const Country = db.Country;

module.exports = {
    getCountryList
};

async function getCountryList() {
    return await Country.find();
}