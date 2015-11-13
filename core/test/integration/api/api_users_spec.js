/*globals describe, it, before, after, beforeEach, afterEach*/
/*jshint expr:true*/

var should = require('should'),
    config = require('../../../server/config'),
    testUtils = require('../../utils'),
    // APIs for users
    UserAPI = require('../../../server/api/users'),
    localUser,
    facebookUser;

localUser = {
  username: 'localUser',
  email: 'localUser@auction.com',
  last_name: 'localUser',
  first_name: 'localUser',
  avatar_url: '/avatar/avatar.jpg',
  genre: 'male',
  birthday: '2015-12-12',
  address: 'Ha Noi',
  provider: 'local',
  password: '123456'
};

facebookUser = {
  username: 'facebookUser',
  email: 'facebookUser@auction.com',
  last_name: 'facebookUser',
  first_name: 'facebookUser',
  avatar_url: '/avatar/avatar.jpg',
  genre: 'male',
  birthday: '2015-12-12',
  address: 'Ha Noi',
  provider: 'facebook',
  access_token: 'abcd123456',
  social_account_id: '123456'
};

describe('User APIs', function () {
  // Keep the DB clean
  before(testUtils.teardown);
  afterEach(testUtils.teardown);
  beforeEach(testUtils.setup);

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
    it('a new local user, should return corresponding user', function (done) {
      UserAPI.create(localUser).then(function (result) {
        result.should.have.property('_id');
        result.should.have.property('password');
        result.should.have.property('created_at');
        // Don't compare password hashed with normal password
        delete result.password;
        delete localUser.password;

        result.should.containEql(localUser);
        done();
      }).catch(done);
    });

    it('a facebook user, should return corresponding user', function (done) {
      UserAPI.create(facebookUser).then(function (result) {
        should(result.password).undefined();
        result.should.containEql(facebookUser);
        done();
      }).catch(done);
    });

    it('should return error bad request if email already existed', function (done) {
      UserAPI.create(localUser).then(function (result1) {
        return UserAPI.create(localUser);
      }).then(function (result2) {
        done();
      }).catch(function (err) {
        err.should.be.an.Error;
        err.errorType.should.eql('BadRequestError');
        err.message.should.eql('User\'s email already existed');
        done();
      });
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
