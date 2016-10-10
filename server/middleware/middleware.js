const jwt = require('jsonwebtoken');
const superSecret = require('./../config/config').sessionSecret;

module.exports = {
  // Override res.send
  override: (req, res, next) => {
    const _send = res.send;
    let sent = false;
    res.send = (data) => {
      if (sent) return;
      _send.bind(res)(data);
      sent = true;
    };
    next();
  },
  // User authentication using token
  authenticate: (req, res, next) => {
    // Check header or url parameters or post parameters for token
    const token = req.headers.authorization.split(' ')[1];
    // decode token
    if (token) {
      // Verify secret and check expires time
      jwt.verify(token, superSecret, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            message: 'Access Denied',
            err: err,
          });
        } else {
          // Save token on request for  use in routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({
        message: 'No token found',
      });
    }
  },
};
