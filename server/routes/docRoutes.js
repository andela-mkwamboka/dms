// Dependencies
const router = require('express').Router();

// Controllers
const docs = require('../controllers/docsCtrl');

// Middleware
const middleware = require('../middleware/middleware');
const accessAuth = require('../middleware/roleAuth');

// Token authentication
router.use(middleware.authenticate);

// DOCUMENT ENDPOINTS
router.route('/')
  .post(docs.create) // Creates a new documents.
  .get(docs.getAll); // Find matching instances of documents.

router.route('/:doc_id')
  .get(accessAuth.docsAccess, docs.getDoc) // Find document.
  .put(accessAuth.docsAccess, docs.update) // Update document.
  .delete(accessAuth.docsAccess, docs.delete); // Delete document


module.exports = router;
