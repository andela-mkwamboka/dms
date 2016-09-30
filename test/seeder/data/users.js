const mongoose = require('mongoose');

module.exports = {
  users:
  [{
    _id: mongoose.Types.ObjectId('57d11f44b0a303c1186279bf'),
    username: 'john',
    name: {
      first: 'john',
      last: 'doe',
    },
    email: 'doe@gmail.com',
    password: '1234',
    role: 'admin',
  },
  {
    _id: mongoose.Types.ObjectId('54d11f35b0a303c1112345db'),
    username: 'mary',
    name: {
      first: 'mary',
      last: 'jane',
    },
    email: 'mj@gmail.com',
    password: '12345',
    role: 'user',
  },
  {
    _id: mongoose.Types.ObjectId('54d11f35c0a303c6712367fc'),
    username: 'Maggie',
    name: {
      first: 'Maggie',
      last: 'Rain',
    },
    email: 'rm@gmail.com',
    password: '12345',
    role: 'user',
  }],
};
