var express                = require('express'),
    config                 = require('./config'),
    mongoose               = require('mongoose'),
    logger                 = require('./logger'),
    middleware             = require('./middleware'),
    AuctionServer          = require('./auction-server');

function connectDb() {
  var options = {server: {socketOptions: {keepAlive: 1}}};
  mongoose.connect(config.mongoDb.connection, options);
  mongoose.connection.on('error', function (err) {
  });
  mongoose.connection.on('disconnected', function (err) {
  });
}

function getInstance() {
  var auctionApp = express();
  middleware(auctionApp);
  return new AuctionServer(auctionApp);
}

module.exports = {
  getInstance: getInstance
};
