const seeder = require('mongoose-seed-plus');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/dms-test', () => {
  // Start processing...
  seeder.start(__dirname, '/migrations',
    [
      // @path: path to model, @name: name of model, @clearclear DB collection
      { path: './../../server/models/user.js', name: 'User', clear: true },
      { path: './../../server/models/document.js', name: 'Document', clear: true },
      { path: './../../server/models/role.js', name: 'Role', clear: true },
    ], true);
});
