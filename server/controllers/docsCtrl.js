const mongoose = require('mongoose');

const Document = mongoose.model('Document');

module.exports = {
  create: (req, res) => {
    const document = new Document();

    // Set user info from request to be added to new instance
    document.title = req.body.title;
    document.content = req.body.content;
    document.ownerId = req.decoded._id;

    // Save the document and check for errors
    document.save((error) => {
      if (error) {
        if (error.code === 11000) {
          res.status(409).json({
            message: 'Title already exists',
          });
        } else {
          /* istanbul ignore next */
          res.status(400).send(error);
        }
      } else {
        res.status(200).json({
          message: 'Document created',
          document: document,
        });
      }
    });
  },
  getAll: (req, res) => {
    const page = req.query.page;
    const skipping = (page - 1) * parseInt(req.query.limit, 10);
    Document
    .find()
    .sort({ createdAt: -1 })
    .skip(skipping)
    .select('-__v')
    .limit(parseInt(req.query.limit, 10) || 10)
    .exec((err, docs) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      res.status(200).json({
        documents: docs,
      });
    });
  },
  getDoc: (req, res) => {
    Document
    .findById(req.params.doc_id)
    .select('-__v')
    .exec((err, document) => {
      if (err) {
        /* istanbul ignore next */
        res.status(400).json(err);
      } else {
        res.status(200).json(document);
      }
    });
  },
  update: (req, res) => {
    Document
    .findById(req.params.doc_id)
    .select('-__v')
    .exec((err, document) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      if (req.body.title) document.title = req.body.title;
      if (req.body.content) document.content = req.body.content;
      document.save(() => {
        res.status(200).json({
          document: document,
        });
      });
    });
  },
  delete: (req, res) => {
    Document
    .findByIdAndRemove(req.params.doc_id)
    .exec((err) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      res.status(202).json({
        message: 'Successfully deleted',
      });
    });
  },
};
