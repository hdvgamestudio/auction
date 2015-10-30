// # Not found error
// Custom error class with status code and type prefilled.

function NotFoundError(message) {
  this.message = message;
  this.stack = new Error().stack;
  this.code = 404;
  this.errorType = this.name;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.name = 'NotFoundError';
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
