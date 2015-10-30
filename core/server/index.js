var express                = require('express'),
    middleware             = require('./middleware'),
    AuctionServer          = require('./auction-server');

function getInstance() {
  var auctionApp = express();
  middleware(auctionApp);
  return new AuctionServer(auctionApp);
}

module.exports = {
  getInstance: getInstance
};
