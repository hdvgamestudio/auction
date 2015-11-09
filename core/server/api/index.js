var _ = require('lodash'),
    validate = require('../request-schemas'),
    users = require('./users'),
    errors = require('../errors'),
    http;

/**
 * Decorator for API functions which are called via an HTTP request. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 */
http = function (apiMethod) {
  return function apiHandler(req, res, next) {
    var errors,
        object,
        options,
        validatedRequest = {
          body: req.body,
          params: req.params,
          query: req.query,
          files: req.files
        };

    errors = validate(validatedRequest, req.resource, req.method);
    if (errors) {
      next(new errors.ValidationError(JSON.stringify(errors)));
    } else {
      object = req.body;
      options = _.extend({}, req.params, req.files, req.query, {
        context: {
          user: (req.user && req.user.id) ? req.user.id : null
        }
      });

      // If this is a GET, or a DELETE, req.body should be null, so we only have options (route and query params)
      // If this is a PUT, POST, or PATCH, req.body is an object
      if (_.isEmpty(object)) {
        object = options;
        options = {};
      }
      apiMethod(object, options).then(function onSuccess(response) {
        res.json(response || {});
      }).catch(function onApiError(error) {
        // To be handled by the API middleware
        next(error);
      });
    }
  };
};

module.exports = {
  http: http,
  users: users
};
