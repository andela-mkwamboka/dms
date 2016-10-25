const mongoose = require('mongoose');

const Document = mongoose.model('Document');

module.exports = {
  searchDoc: (req, res) => {
    const searchTerm = new RegExp(req.params.search, 'i');
    Document
    .find({ title: searchTerm })
    .select('-__v')
    .sort({ createdAt: -1 })
    .exec((err, doc) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      if (doc.length === 0) {
        res.status(404).json({
          message: 'No such title in documents',
        });
      }
      res.status(200).json({
        results: doc,
      });
    });
  },

  searchDate: (req, res) => {
    const query = {};
    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(Date.now());
      query.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }
    Document
    .find(query)
    .skip(parseInt(req.query.offset, 10))
    .limit(parseInt(req.query.limit, 10))
    .select('-__v')
    .sort({ createdAt: -1 })
    .exec((err, doc) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      if (doc.length === 0) {
        res.status(404).json({
          message: 'No documents found',
        });
      }
      res.status(200).json({
        results: doc,
      });
    });
  },
};
