var _ = require('lodash'),
    validate = require('validate.js'),
    validateSchema,
    users = require('./users'),
    resources;

resources = {
  users: users
};

validateSchema = function (object, resource, method) {
  var errors,
      error;

  _.each(Object.keys(object), function (type) {
    error = validate(object[type], resources[resource][method][type]);
    if (error) {
      errors = (errors) ? errors : {};
      errors[type] = error;
    }
  });
  return errors;
};

module.exports = {
  resources: resources,
  validate: validateSchema
};
