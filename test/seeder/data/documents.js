const mongoose = require('mongoose');

module.exports = {
  documents:
  [{
    _id: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
    title: 'Title',
    content: 'Lorem ipsum',
    ownerId: mongoose.Types.ObjectId('54d11f35b0a303c1112345db'),
  },
  {
    _id: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
    title: 'Fellows',
    content: 'Lorem ipsum',
    ownerId: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
  },
  {
    _id: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
    title: 'Lorem',
    content: 'Lorem ipsum',
    ownerId: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
  },
],
};
