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
  },
  content: {
    type: String,
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
