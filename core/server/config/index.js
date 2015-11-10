var path          = require('path'),
    _             = require('lodash'),
    packageInfo   = require('../../../package.json'),
    appRoot       = path.resolve(__dirname, '../../../'),
    corePath      = path.resolve(appRoot, 'core/'),
    defaults,
    envConfig;

defaults = {
  auctionVersion:         packageInfo.version,
  appRoot:                appRoot,
  config:                 path.join(appRoot, 'config.js'),
  configExample:          path.join(appRoot, 'config.example.js'),
  corePath:               corePath,
  logDir:                 path.join(appRoot, '/logs/'),
  clientAssets:           path.join(corePath, '/built/assets/'),
  jwt: {
    secretKey: '123456',
    expiresInMinutes: 1440 // Expires in 24 hours
  },
  uploads: {
    // Used by the upload API to limit uploads to images
    extensions: ['.jpg', '.jpeg', '.gif', '.png', '.svg', '.svgz'],
    contentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
  }
};

// Load config file based on ENV
envConfig = require(path.join(appRoot, 'config.js'))[process.env.NODE_ENV || 'development'];

// Export config file merged
module.exports = _.merge(envConfig, defaults);
