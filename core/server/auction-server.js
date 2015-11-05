// # Auction Server
// Handles the creation of an HTTP Server for Auction
var Promise     = require('bluebird'),
    errors      = require('./errors'),
    config      = require('./config'),
    logger      = require('./logger'),
    socketio    = require('./sockets'),
    redisClient = require('./redis');

function AuctionServer(auctionApp) {
  this.auctionApp = auctionApp;
  this.config = config;
  this.httpServer = null;
  this.connections = {};
  this.connectionId = 0;
}

AuctionServer.prototype.start = function () {
  var self = this;

  return new Promise(function (resolve) {
    if (self.httpServer) {
      logger.debug('Server has already started!');
    } else {
      self.httpServer = self.auctionApp.listen(
        config.server.port,
        config.server.host
      );
      // Init socket
      socketio(self.httpServer, redisClient);
    }

    self.httpServer.on('error', function (error) {
      if (error.errno === 'EADDRINUSE') {
        logger.error('Cannot start the server. Port ' + config.server.port +
          ' is already in use by another');
      } else {
        logger.error('Error: ' + error.errno +
          ' There was an error starting your server. Please check the error');
      }
      process.exit(-1);
    });

    self.httpServer.on('connection', self.connection.bind(self));

    self.httpServer.on('listening', function () {
      logger.debug('Server is listening on port ' + config.server.port +
        ' at IP: ' + config.server.host
      );
      resolve(self);
    });
  });
};

AuctionServer.prototype.connection = function (socket) {
  var self = this;

  self.connectionId += 1;
  socket._auctionId = self.connectionId;
  logger.info('Number connections: ' + self.connectionId);

  socket.on('close', function () {
    delete self.connections[this._ghostId];
  });

  self.connections[socket._ghostId] = socket;
};

/**
 * ### Close Connections
 * Most browsers keep a persistent connection open to the server, which prevents the close callback of
 * httpServer from returning. We need to destroy all connections manually.
 */
AuctionServer.prototype.closeConnections = function () {
  var self = this;

  Object.keys(self.connections).forEach(function (socketId) {
    var socket = self.connetions[socketId];

    if (socket) {
      socket.destroy();
    }
  });
};

module.exports = AuctionServer;
