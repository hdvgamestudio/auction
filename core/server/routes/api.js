var express = require('express'),
    api = require('../api'),
    apiRoutes;

apiRoutes = function (middleware) {
  var router = express.Router();

  router.use(middleware.resourceSeperation);

  router.get('/', function (req, res, next) {
    res.end('Hello auction APIs');
  });

  // User APIs
  router.get('/users', api.http(api.users.get));

  return router;
};

module.exports = apiRoutes;
