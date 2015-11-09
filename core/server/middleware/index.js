var logger = require('../logger'),
    morgan = require('morgan'),
    routes = require('../routes'),
    apiErrorHandlers = require('./api-error-handlers'),
    resourceSeperation = require('./resource-name-seperation'),
    middleware;

middleware = {
  errorHandler: apiErrorHandlers.errorHandler,
  resourceSeperation: resourceSeperation
};

module.exports = function (app) {
  logger.debug('Overriding \'Express\' logger');
  app.use(morgan('combined', {stream: logger.stream}));
  app.use(routes.apiBaseUri, routes.api(middleware));
};

module.exports.middleware = middleware;
