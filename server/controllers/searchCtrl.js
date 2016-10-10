const mongoose = require('mongoose');

const Document = mongoose.model('Document');

module.exports = {
  searchDoc: (req, res) => {
    const searchTerm = new RegExp(req.params.search, 'i');
    Document
    .findOne({ title: searchTerm })
    .select('-__v')
    .exec((err, doc) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      if (!doc) {
        res.status(404).json({
          message: 'No such title in documents',
        });
      }
      res.status(200).json({
        results: doc,
      });
    });
  },
};
