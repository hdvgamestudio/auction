// # Errors
var _                           = require('lodash'),
    path                        = require('path'),
    Promise                     = require('bluebird'),
    NotFoundError               = require('./not-found-error'),
    BadRequestError             = require('./bad-request-error'),
    InternalServerError         = require('./internal-server-error'),
    NoPermissionError           = require('./no-permission-error'),
    MethodNotAllowedError       = require('./method-not-allowed-error'),
    RequestEntityTooLargeError  = require('./request-too-large-error'),
    UnauthorizedError           = require('./unauthorized-error'),
    ValidationError             = require('./validation-error'),
    UnsupportedMediaTypeError   = require('./unsupported-media-type-error'),
    EmailError                  = require('./email-error'),
    DataImportError             = require('./data-import-error'),
    TooManyRequestsError        = require('./too-many-requests-error'),
    errors;

/**
 * Basic error handling helpers
 */
errors = {
  throwError: function (err) {
    if (!err) {
      err = new Error('An error occurred');
    }

    if (_.isString(err)) {
      throw new Error(err);
    }

    throw err;
  },

  // ## Reject Error
  // Used to pass through promise errors when we want to handle them at a later time
  rejectError: function (err) {
    return Promise.reject(err);
  },

  /**
   * ### Format HTTP Errors
   * Converts the error response from the API into a format which can be returned over HTTP
   *
   * @private
   * @param {Array} error
   * @return {{errors: Array, statusCode: number}}
   */
  formatHttpErrors: function formatHttpErrors(error) {
    var statusCode = 500,
      errors = [];

    if (!_.isArray(error)) {
      error = [].concat(error);
    }

    _.each(error, function each(errorItem) {
      var errorContent = {};

      // TODO: add logic to set the correct status code
      statusCode = errorItem.code || 500;

      errorContent.message = _.isString(errorItem) ? errorItem :
        (_.isObject(errorItem) ? errorItem.message : 'Unknown API Error');
      errorContent.errorType = errorItem.errorType || 'InternalServerError';
      errors.push(errorContent);
    });

    return {errors: errors, statusCode: statusCode};
  },

  handleAPIError: function (error, permsMessage) {
    if (!error) {
      return this.rejectError(
        new this.NoPermissionError(permsMessage || 'You do not have permission to perform this action')
      );
    }

    if (_.isString(error)) {
      return this.rejectError(new this.NoPermissionError(error));
    }

    if (error.errorType) {
      return this.rejectError(error);
    }

    // handle database errors
    if (error.code && (error.errno || error.detail)) {
      error.db_error_code = error.code;
      error.errorType = 'DatabaseError';
      error.code = 500;

      return this.rejectError(error);
    }

    return this.rejectError(new this.InternalServerError(error));
  }
};

// Ensure our 'this' context for methods and preserve method arity by
// using Function#bind for expressjs
_.each([
  'rejectError',
  'throwError',
  'handleAPIError',
  'formatHttpErrors'
], function (funcName) {
  errors[funcName] = errors[funcName].bind(errors);
});

module.exports                            = errors;
module.exports.NotFoundError              = NotFoundError;
module.exports.BadRequestError            = BadRequestError;
module.exports.InternalServerError        = InternalServerError;
module.exports.NoPermissionError          = NoPermissionError;
module.exports.UnauthorizedError          = UnauthorizedError;
module.exports.ValidationError            = ValidationError;
module.exports.RequestEntityTooLargeError = RequestEntityTooLargeError;
module.exports.UnsupportedMediaTypeError  = UnsupportedMediaTypeError;
module.exports.EmailError                 = EmailError;
module.exports.DataImportError            = DataImportError;
module.exports.MethodNotAllowedError      = MethodNotAllowedError;
module.exports.TooManyRequestsError       = TooManyRequestsError;
