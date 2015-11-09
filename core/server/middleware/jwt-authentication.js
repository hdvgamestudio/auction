var jwt = require('jsonwebtoken'),
    config = require('../config'),
    errors = require('../errors'),
    authenticate;

authenticate = function (req, res, next) {
  // Get token in request header
  var token = req.headers['x-access-token'];

  // Decode token
  if (token) {
    jwt.verify(token, config.jwt.secretKey, function (err, decoded) {
      if (err) {
        return next(new errors.UnauthorizedError('Invalid token'));
      } else {
        req.context = decoded;
        next();
      }
    });
  } else {
    return next(new errors.UnauthorizedErrors('Token is not provided'));
  }
};

