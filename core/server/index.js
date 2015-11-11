var express                = require('express'),
    mongoose               = require('mongoose'),
    config                 = require('./config'),
    db                     = require('./db'),
    logger                 = require('./logger'),
    middleware             = require('./middleware'),
    AuctionServer          = require('./auction-server');

function getInstance() {
  // Load config
  logger.debug('Loading config');
  config.load(config.configPath);

  // Connect mongodb
  logger.debug('Connecting to mongoDB');
  db.connect();

  // Create express instance
  logger.debug('Initiating express app');
  var auctionApp = express();

  // Set middleware
  middleware(auctionApp);
  return new AuctionServer(auctionApp);
}

module.exports = {
  getInstance: getInstance
};
