// Dependencies
const router = require('express').Router();

// routes
const users = require('./userRoutes');
const documents = require('./docRoutes');
const roles = require('./roleRoutes');
const search = require('./search');

// USE EXPRESS JWT

// Routes
router.use('/users', users);
router.use('/documents', documents);
router.use('/roles', roles);
router.use('/search', search);

module.exports = router;
