var _ = require('lodash'),
    users = require('./users'),
    http;

/**
 * Decorator for API functions which are called via an HTTP request. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 */
http = function (apiMethod) {
  return function apiHandler(req, res, next) {
    var object = req.body,
        options = _.extend({}, req.files, req.params, req.query, {
          context: {user: (req.user && req.user.id) ? req.user.id : null}
        });

    // If this is a GET, or a DELETE, req.body should be null, so we only have options (route and query params)
    // If this is a PUT, POST, or PATCH, req.body is an object
    if (_.isEmpty(object)) {
      object = options;
      options = {};
    }
    res.end('Admin API');
    // Return a promise after validating req data
    // Validate('resource', req)
    /*
    apiMethod(object, options).then(function onSuccess(response) {
      res.json(response || {});
    }).catch(function onApiError(error) {
      // To be handled by the API middleware
      next(error);
    });
    */
  };
};

module.exports = {
  http: http,
  users: users

};
