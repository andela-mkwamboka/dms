const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: 'user',
    ref: 'Role',
  },
});

// Hash the password before the user is saved
userSchema.pre('save', function (next) {
  // Hash the password only if the password has been changed or user is new
  if (!this.isModified('password')) return next();
  // generate the hash
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    // Change the password to the hashed one
    this.password = hash;
    next();
  });
});

mongoose.model('Users', userSchema);
