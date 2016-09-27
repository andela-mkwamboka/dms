// Dependencies
const router = require('express').Router();

const search = require('../controllers/searchCtrl');
// Middleware
const middleware = require('../middleware/middleware');

// Token authentication
router.use(middleware.authenticate);


router.route('/:search')
  .get(search.searchDoc);

module.exports = router;
