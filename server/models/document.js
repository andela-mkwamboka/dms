const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    select: false,
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Document', DocumentSchema);
