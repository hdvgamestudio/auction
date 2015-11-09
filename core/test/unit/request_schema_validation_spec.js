/* globals describe, it, beforeEach, afterEach */
/*jshint expr:true*/

var should  = require('should'),
    validate = require('validate.js'),

    // Stuff will be tested
    schemas = require('../../server/request-schemas'),
    req,
    errors;

describe('Validate request', function () {
  describe('Body', function () {
    it('should be ok if request is empty', function () {
      req = {};
      errors = schemas.validate(req, 'users', 'POST');
      should(errors).equal(undefined);
    });
    it('should return errors of required properties if body is empty, ', function () {
      req = {body: {}};
      errors = schemas.validate(req, 'users', 'POST');
      errors.should.have.ownProperty('body');
      errors.body.username.should.eql(['Username can\'t be blank']);
      errors.body.display_name.should.eql(['Display name can\'t be blank']);
    });
  });
  describe('Query', function () {
    it('should return errors if query is invalid', function () {
      req = {
        query: {
          page: 'q',
          perpage: 20
        }
      };

      errors = schemas.validate(req, 'users', 'GET');
      errors.should.have.ownProperty('query');
      errors.query.page.should.eql(['Page is not a number']);
    });
    it('should be ok if all fields are valid', function () {
      req = {
        query: {
          page: 1,
          perpage: 20
        }
      };

      errors = schemas.validate(req, 'users', 'GET');
      should(errors).equal(undefined);
    });
  });
  describe('Params', function () {
    it('should be ok if all params is valid', function () {
      req = {
        params: {
          id: '123456'
        }
      };
      errors = schemas.validate(req, 'users', 'GET');
      should(errors).equal(undefined);
    });
  });
  describe('Files', function () {
    it('should be ok if files is empty');
  });
});
