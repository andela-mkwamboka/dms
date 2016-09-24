// Dependancies
const express = require('express');
const bodyParser = require('body-parser');

// DB connection
require('./server/config/db');

const app = express();

// Configure express to use bodyParser() to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start server
app.listen(3000, () => {
  console.log('Running');
});
