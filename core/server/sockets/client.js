var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function () {
  console.log('connected!');
});
socket.emit('bid', '49');
socket.emit('getBids', '1000');
socket.on('increaseBid', function (data) {
  console.log('No.bid: ' + data);
});
