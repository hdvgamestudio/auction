var socketio = require('socket.io');

module.exports = function (server, redisClient) {
  var io = socketio.listen(server),
      bid = 0;
  io.on('connection', function (socket) {
    socket.on('bid', function (data) {
      console.log('bidding: increase number of people by 1: ' + data);
    });

    socket.on('getBids', function (data) {
      console.log('getBids: ' + data);
    });

    setInterval(function () {
      bid = bid + 1;
      console.log('No.bid: ' + bid);
      socket.emit('increaseBid', bid);
    }, 10000);
  });
};
