const mongoose = require('mongoose');
<<<<<<< HEAD
const bcrypt = require('bcrypt-nodejs');
=======
>>>>>>> staging

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
<<<<<<< HEAD
  },
  role: {
    type: String,
    ref: 'Role',
    default: 'user',
  },
});

// Hash the password before the user is saved
userSchema.pre('save', function (next) {
  const user = this;
  // Hash the password only if the password has been changed or user is new
  /* istanbul ignore next */
  if (!user.isModified('password')) return next();
  // generate the hash
  bcrypt.hash(user.password, null, null, (err, hash) => {
    /* istanbul ignore next */
    if (err) return next(err);
    // Change the password to the hashed one
    user.password = hash;
    next();
  });
});

 // Compare a given password with the database hash
userSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('Users', userSchema);
=======
    select: false,
  },
  role: {
    type: String,
    default: 'user',
    ref: 'Role',
  },
});

mongoose.model('Users', userSchema);
>>>>>>> staging
