var api = require('./api'),
    config = require('../config');

module.exports = {
  apiBaseUri: config.apiBaseUri,
  api: api
};
