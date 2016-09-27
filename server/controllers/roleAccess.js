const rbac = require('easy-rbac').create(
  {
    user: { // Role name
      can: ['doc:create', { // list of allowed operations
        name: 'doc:update&delete',
        when: function (params, callback) {
          setImmediate(callback, null, params.Id === params.ownerId);
        } },
        {
          name: 'user:delete&update',
          when: function (params, callback) {
            setImmediate(callback, null, params.Id === params.ownerId);
          } },
      ],
    },
    admin: {
      can: ['doc:delete&update', 'user:deleted&update', 'role:create'],
    },
  }
);

module.exports = rbac;
