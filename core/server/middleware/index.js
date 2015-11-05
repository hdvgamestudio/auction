var logger = require('../logger'),
    morgan = require('morgan'),
    routes = require('../routes'),
    middleware;

middleware = {};

module.exports = function (app) {
  logger.debug('Overriding \'Express\' logger');
  app.use(morgan('combined', {stream: logger.stream}));
  app.use(routes.apiBaseUri, routes.api(middleware));
};
