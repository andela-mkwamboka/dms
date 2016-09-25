const rbac = require('./helpers/rbac');
const Document = require('../models/document');

module.exports = {
  usersAccess: (req, res, next) => {
    const userId = req.params.user_id || req.params.id;
    rbac.can(req.decoded.role, 'user:delete&update', { userId: req.decoded._id, id: userId }, ((err, can) => {
      if (err || !can) {
        res.status(401).json({ message: 'Not authorized', err: err });
      } else {
        return next();
      }
    }));
  },

  docsAccess: (req, res, next) => {
    const docId = req.params.document_id;
    Document
    .findById(docId)
    .select('ownerId')
    .exec((err, idObject) => {
      if (err) res.status(400).send({ message: err });
      rbac.can(req.decoded.role, 'doc:delete&update:any', (error, can) => {
        if (error || !can) {
          rbac.can(req.decoded.role, 'doc:delete&update', { userId: req.decoded._id, ownerId: idObject.ownerId }, (err, can) => {
            if (err || !can) {
              console.log(err);
              console.log('Hey');
              res.status(401).json({
                message: 'Unauthorized', err: err,
              });
            } else {
              return next();
            }
          });
        } else {
          return next();
        }
      });
    });
  },

  rolesAccess: (req, res, next) => {
    rbac.can(req.decoded.role, 'role:create:delete:update:get', (err, can) => {
      if (err || !can) {
        res.status(401).json({
          message: 'Unauthorized',
          err: err,
        });
      } else {
        return next();
      }
    });
  },
};
