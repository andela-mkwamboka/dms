const mongoose = require('mongoose');
const rbac = require('./roleAccess');

const Role = mongoose.model('Role');

module.exports = {
  create: (req, res) => {
    rbac.can(req.decoded.role, 'role:create', (err, can) => {
      if (err || !can) {
        res.status(403).json({
          message: 'Not accessible',
        });
      } else {
        const role = new Role();
        // Set role info from request
        role.title = req.body.title;
        // save role and check for errors
        role.save((err) => {
          if (err) {
            // Duplicate entry
            if (err.code === 11000) {
              res.status(409).json({
                message: 'Title already exists',
              });
            }
            res.status(400).json({
              message: err,
            });
          }
          res.status(201).json({
            message: 'Role created',
            role: role,
          });
        });
      }
    });
  },
  getAll: (req, res) => {
    rbac.can(req.decoded.role, 'role:view', (err, can) => {
      if (err || !can) {
        res.status(403).json({
          message: 'Not accessible',
        });
      } else {
        Role
        .find({})
        .select('-__v')
        .exec((err, roles) => {
          /* istanbul ignore next */
          if (err) res.status(404).json(err);
          if (roles.length === 0) {
            res.status(404).json({ message: 'No roles found' });
          } else {
            res.status(200).json({ roles: roles });
          }
        });
      }
    });
  },
  getRole: (req, res) => {
    rbac.can(req.decoded.role, 'role:view', (err, can) => {
      if (err || !can) {
        res.status(403).json({
          message: 'Not accessible',
        });
      } else {
        Role
        .findById(req.params.role_id)
        .select('-__v')
        .exec((err, role) => {
          if (role) {
            /* istanbul ignore next */
            if (err) res.status(404).json(err);
            res.status(200).json(role);
          } else {
            res.status(404).json({ message: 'Role doesn\'t exist' });
          }
        });
      }
    });
  },
  delete: (req, res) => {
    rbac.can(req.decoded.role, 'role:delete', (err, can) => {
      if (err || !can) {
        res.status(403).json({
          message: 'Not accessible',
        });
      } else {
        Role
        .findByIdAndRemove(req.params.role_id)
        .exec((err, role) => {
          if (role) {
            /* istanbul ignore next */
            if (err) res.status(404).json(err);
            res.status(202).json({
              message: 'Successfully deleted',
            });
          } else {
            res.status(404).json({ message: 'Role doesn\'t exist' });
          }
        });
      }
    });
  },
};
