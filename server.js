require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/countries', require('./locations/countries/country.controller'));
app.use('/regions', require('./locations/regions/region.controller'));
app.use('/states', require('./locations/states/state.controller'));
app.use('/towns', require('./locations/towns/town.controller'));
app.use('/jobs', require('./locations/jobs/job.controller'));
app.use('/job-application', require('./job_application/jobApplication.cotroller'))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
