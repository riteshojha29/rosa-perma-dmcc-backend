const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Country: require('../locations/countries/country.model'),
    Region: require('../locations/regions/region.model'),
    State: require('../locations/states/state.model'),
    Town: require('../locations/towns/town.model'),
    Job: require('../locations/jobs/job.model'),
    JobApplication: require('../job_application/jobApplication.model')
};