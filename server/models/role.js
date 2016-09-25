const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    enum: ['user', 'admin'],
  },
  permissions: {
    type: String,
    required: true,
    enum: ['read', 'readwrite'],
  },
});

module.exports = mongoose.model('Role', RoleSchema);
