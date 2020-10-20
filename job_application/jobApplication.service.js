const db = require('_helpers/db');
const JobApplication = db.JobApplication;

module.exports = {
    submitJobApplication
};


async function submitJobApplication(data) {
    const { userid, country, region, state, town, jobTitle, address, coordinate, profilePhoto } = data;
    
    if (!userid) {
        throw "User ID unknown";
    }

    if (!country) {
        throw "Please select country";
    }

    if (!region) {
        throw "Please select region";
    }

    if (!state) {
        throw "Please select state";
    }

    if (!town) {
        throw "Please select town";
    }

    if (!jobTitle) {
        throw "Please select job title";
    }

    if (!address) {
        throw "Please enter address";
    }

    if (!coordinate) {
        throw "Please select location on map";
    }

    if (!profilePhoto) {
        throw "Please add a profile picture";
    }

    const jobApplication = new JobApplication(data);

    // save job application
    await jobApplication.save();
}