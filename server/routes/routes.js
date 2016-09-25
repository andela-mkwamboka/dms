// Dependencies
const router = require('express').Router();

// Middleware
const middleware = require('../middleware/middleware');

// Controllers
const users = require('../controllers/usersCtrl');

// Config

// Middleware


// USE EXPRESS JWT


// Define routes and mapping them to controllers
// USER ENDPOINTS
router.route('/users')
  .post(users.create); // Creates a new user.

router.use(middleware.authenticate);

router.route('/')
  .get(users.getting);

module.exports = router;
