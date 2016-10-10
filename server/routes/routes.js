// Dependencies
const router = require('express').Router();

// routes
const users = require('./userRoutes');
const documents = require('./docRoutes');
const roles = require('./roleRoutes');

// USE EXPRESS JWT

// Routes
router.use('/users', users);
router.use('/documents', documents);
router.use('/roles', roles);

module.exports = router;
