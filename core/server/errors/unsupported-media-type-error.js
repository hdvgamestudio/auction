// # Unsupported Media Type
// Custom error class with status code and type prefilled.

function UnsupportedMediaTypeError(message) {
  this.message = message;
  this.stack = new Error().stack;
  this.code = 415;
  this.errorType = this.name;
}

UnsupportedMediaTypeError.prototype = Object.create(Error.prototype);
UnsupportedMediaTypeError.prototype.name = 'UnsupportedMediaTypeError';
UnsupportedMediaTypeError.prototype.UnsupportedMediaTypeError = UnsupportedMediaTypeError;

module.exports = UnsupportedMediaTypeError;