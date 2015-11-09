var jwt = require('jsonwebtoken'),
    config = require('../config');

module.exports = {
  generateJwtToken: function (payload, secretKey, options) {
    return jwt.sign(payload, secretKey, options);
  }
};
