// Dependancies
const mongoose = require('mongoose');
const app = require('express')();
const dbConfig = require('./config');

// Close connection
const shutDown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ', msg);
    callback();
  });
};
// Open mongoose connection
mongoose.connect(dbConfig.db[app.settings.env]);
mongoose.Promise = global.Promise;

// Listening for changes
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ', dbConfig.db[app.settings.env]);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Disconnect mongoose
// Nodemon
process.once('SIGUSR2', () => {
  // Send message to shutDown and callback to kill process
  shutDown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// Terminal
process.on('SIGINT', () => {
  // Send message to shutDown and callback to kill process
  shutDown('App termination', () => {
    process.exit(0);
  });
});

// Add models to api
require('./../models/user');
require('./../models/document');
require('./../models/role');
