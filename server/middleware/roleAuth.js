const rbac = require('./helpers/rbac');
const Document = require('../models/document');

module.exports = {
  userAccess: (req, res, next) => {
      const userId = req.params.user_id || req.params.id;
      rbac.can(req.decoded.role, 'user:deleted&update:any', ((err, can) => {
        if (err || !can) {
          rbac.can(req.decoded.role, 'user:delete&update', { userId: req.decoded._id, id: userId }, ((err, can) => {
            if (err || !can) {
              res.status(401).json({ message: 'Not authorized', err: err });
            } else {
              return next();
            }
          }));
        } else {
          return next();
        }
      }));
  },

  docAccess: (req, res, next) => {
      const docId = req.params.document_id;
      Document.findById(docId).select('ownerId').exec((err, idObject) => {
        if (err) {
          res.status(400).send({
            message: err
          });
        } else {
          rbac.can(req.decoded.role, 'doc:delete&update:any', (err, can) => {
            if (err || !can) {
              rbac.can(req.decoded.role, 'doc:delete&update', { userId: req.decoded._id, ownerId: idObject.ownerId }, (err, can) => {
                if (err || !can) {
                  res.status(401).json({ message: 'Not authorized', err: err });
                } else {
                  return next();
                }
              });
            } else {
              return next();
            }
          });
        }
      });
  },

  roleAccess: (req, res, next) => {
      rbac.can(req.decoded.role, 'role:create:delete:update:get', (err, can) => {
        if (err || !can) {
          res.status(401).json({ message: 'Not authorized', err: err });
        } else {
          return next();
        }
      });
  }
};
