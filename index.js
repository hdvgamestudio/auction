var AuctionServer = require('./core/server');

// Start server
AuctionServer.getInstance().start().then(function (auctionServer) {
  console.log('Start successfully!');
}).catch (function (err) {
  console.log(err);
});
