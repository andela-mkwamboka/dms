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
    user.role = req.body.role;


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
  login: (req, res) => {
    User
    .findOne({ username: req.body.username })
    .exec((err, user) => {
      /* istanbul ignore next */
      if (err) res.status(404).json({ err: err });
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
      } else if (user) {
        // Check if password matches
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.status(400).json({ message: 'Wrong password.' });
        }
        const claims = ({
          _id: user._id,
          username: req.body.username,
          role: user.role,
        });
        // Create token
        const token = jwt.sign(claims, superSecret, {
          expiresIn: 60 * 60 * 24, // 24 hours
        });
        res.status(200).json({
          message: 'Enjoy your token!',
          token: token,
        });
      }
    });
  },
  getAll: (req, res) => {
    User
    .find({})
    .select('-password -__v')
    .exec((err, users) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      if (users.length === 0) {
        res.status(404).json({ message: 'No users found' });
      } else {
        res.status(200).json({ users: users });
      }
    });
  },
  getUser: (req, res) => {
    User
    .findById(req.params.user_id)
    .select('-__v -password')
    .exec((err, user) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      if (!user) {
        res.send(404).json({
          message: 'User not found',
        });
      }
      res.status(200).json(user);
    });
  },
  update: (req, res) => {
    User
     .findById(req.params.user_id)
     .select('-__v')
     .exec((err, user) => {
       /* istanbul ignore next */
       if (err) res.status(404).json(err);
       if (!user) {
         res.status(404).json({
           message: 'User not found',
         });
       }
       // update the users info only if its new
       if (req.body.username) user.username = req.body.username;
       if (req.body.password) user.password = req.body.password;
       if (req.body.first) user.name.first = req.body.first;
       if (req.body.last) user.name.last = req.body.last;
       if (req.body.email) user.name.email = req.body.email;
       if (req.body.role) user.name.role = req.body.role;
       // Update the user
       user.save(() => {
         res.status(200).json(user);
       });
     });
  },
  delete: (req, res) => {
    User
    .findByIdAndRemove(req.params.user_id)
    .exec((err) => {
      /* istanbul ignore next */
      if (err) res.status(404).json(err);
      res.status(202).json({
        message: 'Successfully deleted',
      });
    });
  },
};
