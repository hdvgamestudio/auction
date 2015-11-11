var path          = require('path'),
    _             = require('lodash'),
    mongoose      = require('mongoose'),
    packageInfo   = require('../../../package.json'),
    appRoot       = path.resolve(__dirname, '../../../'),
    corePath      = path.resolve(appRoot, 'core/'),
    mongooseInstance,
    envConfig,
    defaults;

defaults = {
  auctionVersion:         packageInfo.version,
  appRoot:                appRoot,
  configPath:             path.join(appRoot, 'config.js'),
  configExamplePath:      path.join(appRoot, 'config.example.js'),
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

function ConfigManager(config) {
  this._config = {};

  if (config && _.isObject(config)) {
    this.set(config);
  }
}

ConfigManager.prototype.set = function (config) {
  _.merge(this._config, config);
  _.extend(this, this._config);
};

ConfigManager.prototype.get = function () {
  return this._config;
};

ConfigManager.prototype.load = function (configFilePath) {
  // Load config file based on ENV
  envConfig = require(configFilePath)[process.env.NODE_ENV || 'development'];
  this.set(envConfig);
};

// Export config object
module.exports = new ConfigManager(defaults);
