var mongoose = require('mongoose'),
    Promise  = require('bluebird'),
    config   = require('../config'),
    logger   = require('../logger'),
    connect;

connect = function () {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  logger.debug('Connecting to mongodb at ' + config.mongoDb.host +
    ' on port ' + config.mongoDb.port);
  mongoose.connect(config.mongoDb.connection, options);
};

module.exports = {
  connect: function () {
    connect();
    mongoose.connection.on('error', function () {
      logger.error('Error to Connect to mongodb at ' + config.mongoDb.host +
        ' on port ' + config.mongoDb.port);
    });
  },

  dropDatabase: function () {
    return new Promise(function (resolve) {
      mongoose.connect(config.mongoDb.connection, function () {
        /* Drop the DB */
        mongoose.connection.db.dropDatabase();
        resolve();
      });
    });
  },

  close: function () {
    mongoose.connection.close();
    logger.debug('Close connection to DB at host ' + config.mongoDb.host +
      ' on port ' + config.mongoDb.port);
  }
};
