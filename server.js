// Dependancies
const express = require('express');
const bodyParser = require('body-parser');

const middleware = require('./server/middleware/middleware');
// DB connection
require('./server/config/db');

const app = express();

// Configure express to use bodyParser() to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware
app.use(middleware.override);

// Routes
const apiRoutes = require('./server/routes/routes');


app.use('/', apiRoutes);

// Start server
app.listen(3000, () => {
  console.log('Running');
});

module.exports = app;
