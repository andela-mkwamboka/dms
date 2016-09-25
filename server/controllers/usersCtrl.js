const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const superSecret = require('./../config/config').sessionSecret;

const User = mongoose.model('Users');

module.exports = {
  create: (req, res) => {
    const user = new User();

    // Set user info from request
    user.username = req.body.username;
    user.name.first = req.body.first;
    user.name.last = req.body.last;
    user.email = req.body.email;
    user.password = req.body.password;


    // save user and check for errors
    user.save((err) => {
      if (err) {
        // Duplicate entry
        if (err.code === 11000) {
          res.status(409).json({
            message: 'A user with that username already exists.',
          });
        }
        res.status(400).json({
          message: err,
        });
      }
      const claims = ({
        _id: user._id,
        username: req.body.username,
        role: req.body.role,
      });
      // Create token
      const token = jwt.sign(claims, superSecret, {
        expiresIn: 60 * 60 * 24, // 24 hours
      });
      res.status(200).json({
        message: 'User saved',
        token: token,
      });
    });
  },
};
