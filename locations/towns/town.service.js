const db = require('_helpers/db');
const Town = db.Town;

module.exports = {
    getTownListByStateCode,
    loadData,
    getAllTowns
};

async function getTownListByStateCode(id) {
    return await Town.find({stateCode : id});
}

async function loadData(data) {
    const length1 = data.arr.length;

    for(i=0; i<length1; i++) {
        const town = new Town(data.arr[i]);
        town.save();
    }

}

async function getAllTowns() {
    return await Town.find();
}