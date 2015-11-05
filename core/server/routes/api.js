var express = require('express'),
    api = require('../api'),
    apiRoutes;

apiRoutes = function (middleware) {
  var router = express.Router();

  router.use(function (req, res, next) {
    console.log('Only run with api middleware');
    next();
  });

  router.get('/', function (req, res, next) {
    res.end('Hello auction APIs');
  });

  // User APIs
  router.get('/users', api.http(api.users.get));

  return router;
};

module.exports = apiRoutes;
