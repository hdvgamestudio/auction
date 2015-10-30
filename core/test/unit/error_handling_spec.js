/*globals describe, before, beforeEach, afterEach, it*/

require('should-promised');

var Promise = require('bluebird'),
    should = require('should'),
    errors = require('../../server/errors');

describe('Error handling', function () {
  describe('Throwing', function () {
    it('throws error objects', function () {
      var toThrow = new Error('test1'),
          runThrowError = function () {
            errors.throwError(toThrow);
          };

      runThrowError.should['throw']('test1');
    });

    it('throws error strings', function () {
      var toThrow = 'test2',
          runThrowError = function () {
            errors.throwError(toThrow);
          };
      runThrowError.should['throw']('test2');
    });

    it('throws error even if nothing passed', function () {
      var runThrowError = function () {
        errors.throwError();
      };
      runThrowError.should['throw']('An error occurred');
    });
  });

  describe('Passing and error', function () {
    it('pass through an promise error', function () {
      var passedError = new Error('test1'),
          rejectedPromise;

      rejectedPromise = errors.rejectError(passedError);
      rejectedPromise.should.be.Promise();
      rejectedPromise.should.be.rejectedWith(Error, {message: 'test1'});
    });
  });
});
