/*globals describe, it, beforeEach, afterEach*/
/*jshint expr:true*/

var should = require('should'),
    config = require('../../../server/config'),
    // APIs for users
    UserAPI = require('../../../server/api/users');

describe('User APIs', function () {
  describe('Get', function () {
    it('can fetch all records', function () {
    });
    it('can fetch records with limit', function () {
    });
    it('can fetch page 1', function () {
    });
    it('can fetch page 2', function () {
    });
    it('filter fields returned', function () {
    });
    it('sort records by certain fields', function () {
    });
  });
  describe('Create', function () {
    // Local user
    it('a local user, should return corresponding user', function () {
      var localUser = {
        username: 'localUser',
        email: 'localUser@auction.com',
        display_name: 'localUser',
        avatar: '/avatar/avatar.jpg',
        genre: 'male',
        birthday: '2015-12-12',
        provider: 'local',
        authToken: '',
        password: '123456'
      };
    });
    it('a facebook user, should return corresponding user', function () {
    });
    it('should return error bad request if email already existed', function () {
    });
  });
  describe('Update', function () {
    it('update an existing user, only update modified fields', function () {
    });
    it('update a non-existing user, return error', function () {
    });
  });
  describe('Delete', function () {
    it('delete an existing user', function () {
    });
    it('delete a non-existing user', function () {
    });
  });
});
