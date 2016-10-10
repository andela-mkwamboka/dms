const mongoose = require('mongoose');
const database = require('./../../server/config/config').db.test;
const User = require('./../../server/models/user');
const Role = require('../../server/models/role');
const Document = require('../../server/models/document');

const doc = require('./data/documents');
const role = require('./data/roles');
const user = require('./data/users');

mongoose.Promise = global.Promise;
mongoose.connect(database, (err, db) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.db.dropDatabase(() => {
      console.log('Database dropped');
    });
  }
});

mongoose.connection.on('connected', () => {
  Role.create(role.roles)
  .then(() => {
    console.log('Roles successfully seeded');
  });
  Document.create(doc.documents).then(() => {
    console.log('Documents successfully seeded');
  });
  User.create(user.users).then(() => {
    console.log('User successfully seeded');
  })
  .then(() => {
    process.exit();
  });
});
