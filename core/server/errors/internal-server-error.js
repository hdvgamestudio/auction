// # Internal Server Error
// Custom error class with status code and type prefilled.

function InternalServerError(message) {
  this.message = message;
  this.stack = new Error().stack;
  this.code = 500;
  this.errorType = this.name;
}

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.name = 'InternalServerError';
InternalServerError.prototype.constructor = InternalServerError;

module.exports = InternalServerError;
