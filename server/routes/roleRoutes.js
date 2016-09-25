// Dependencies
const router = require('express').Router();

// Controllers
const roles = require('../controllers/rolesCtrl');

// Middleware
const middleware = require('../middleware/middleware');

// Token authentication
router.use(middleware.authenticate);

// DOCUMENT ENDPOINTS
router.route('/')
  .post(roles.create) // Creates a new role.
  .get(roles.getAll); // Get all roles.

router.route('/:role_id')
  .get(roles.getRole) // Find role.
  .delete(roles.delete); // Delete role.


module.exports = router;
