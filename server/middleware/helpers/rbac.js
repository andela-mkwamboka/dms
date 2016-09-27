const rbac = require('easy-rbac').create(
  {
    user: {
      can: ['documents:create', 'documents:create', 'users:create', 'users:get', {
        name: 'documents:udate&delete',
        when: (params, callback) => {
          setImmediate(callback, null, params.userId === params.ownerId);
        },
      }, {
        name: 'documents:udate&delete',
        when: (params, callback) => {
          setImmediate(callback, null, params.userId === params.ownerId);
        },
      },
    ] },
    admin: {
      can: ['documents:delete&update:any', 'documents:get:all', 'user:deleted&update:any', 'users:get:all', 'role:create:delete:update:get'],
      inherits: ['user'],
    },
  }
);

module.exports = rbac;
