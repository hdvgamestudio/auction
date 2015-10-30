var logger = require('../logger'),
    morgan = require('morgan');

module.exports = function (app) {
  logger.debug('Overriding \'Express\' logger');
  app.use(morgan('combined', {stream: logger.stream}));
};
