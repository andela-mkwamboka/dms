// Dependencies
const router = require('express').Router();

// Controllers
const docs = require('../controllers/docsCtrl');

// Middleware
const middleware = require('../middleware/middleware');
<<<<<<< HEAD
=======

>>>>>>> Removed rbac connection to code and added search rout with tests
// Token authentication
router.use(middleware.authenticate);

// DOCUMENT ENDPOINTS
router.route('/')
  .post(docs.create) // Creates a new documents.
  .get(docs.getAll); // Find matching instances of documents.

router.route('/:doc_id')
  .get(docs.getDoc) // Find document.
  .put(docs.update) // Update document.
  .delete(docs.delete); // Delete document


module.exports = router;
