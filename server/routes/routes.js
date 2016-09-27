// Dependencies
const router = require('express').Router();

// routes
const users = require('./userRoutes');
const documents = require('./docRoutes');
const roles = require('./roleRoutes');
<<<<<<< HEAD
=======
const search = require('./search');
>>>>>>> Removed rbac connection to code and added search rout with tests

// USE EXPRESS JWT

// Routes
router.use('/users', users);
router.use('/documents', documents);
router.use('/roles', roles);
<<<<<<< HEAD
=======
router.use('/search', search);
>>>>>>> Removed rbac connection to code and added search rout with tests

module.exports = router;
