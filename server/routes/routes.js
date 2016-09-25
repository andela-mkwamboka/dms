// Dependencies
const router = require('express').Router();

// Controllers
const users = require('../controllers/usersCtrl');

// Config

// Middleware


// USE EXPRESS JWT


// Define routes and mapping them to controllers
// USER ENDPOINTS
router.route('/users')
  .post(users.create); // Creates a new user.


module.exports = router;
