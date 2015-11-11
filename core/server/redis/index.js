var config = require('../config'),
    redis = require('redis'),
    client;
/*
client = redis.createClient(config.redisServer.port, config.redisServer.host);

client.on('error', function (err) {
  console.log(err);
});
*/
module.exports = client;
