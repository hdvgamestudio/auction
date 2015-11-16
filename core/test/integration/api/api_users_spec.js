/*globals describe, it, before, after, beforeEach, afterEach*/
/*jshint expr:true*/

var should = require('should'),
    config = require('../../../server/config'),
    models = require('../../../server/models'),
    testUtils = require('../../utils'),
    // APIs for users
    UserAPI = require('../../../server/api/users'),
    localUser,
    facebookUser;

localUser = {
  _id: '1',
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
    beforeEach(function (done) {
      var users = [
        {_id: '1', username: 'user1', email: 'user1@yahoo.com'},
        {_id: '2', username: 'user2', email: 'user2@yahoo.com'},
        {_id: '3', username: 'user3', email: 'user3@yahoo.com'},
        {_id: '4', username: 'user4', email: 'user4@yahoo.com'},
        {_id: '5', username: 'user5', email: 'user6@yahoo.com'},
        {_id: '6', username: 'user5', email: 'user5@yahoo.com'},
        {_id: '7', username: 'user7', email: 'user7@yahoo.com'},
        {_id: '8', username: 'user8', email: 'user8@yahoo.com'},
        {_id: '9', username: 'user9', email: 'user9@yahoo.com'},
        {_id: '10', username: 'user10', email: 'user10@yahoo.com'}
      ];

      models.User.collection.insert(users, function (err, data) {
        done();
      });
    });

    it('can fetch all records', function (done) {
      UserAPI.get().then(function (users) {
        users.length.should.eql(10);
        users[0]._id.should.eql('1');
        users[1]._id.should.eql('2');
        users[9]._id.should.eql('10');
        done();
      }).catch(done);
    });

    it('can fetch records with limit', function (done) {
      UserAPI.get({perpage: 3, page: 1}).then(function (users) {
        users.length.should.eql(3);
        users[0]._id.should.eql('1');
        users[1]._id.should.eql('2');
        users[2]._id.should.eql('3');
        done();
      }).catch(done);
    });

    it('can fetch page 2', function (done) {
      UserAPI.get({perpage: 7, page: 2}).then(function (users) {
        users.length.should.eql(3);
        users[0]._id.should.eql('8');
        users[1]._id.should.eql('9');
        users[2]._id.should.eql('10');
        done();
      }).catch(done);
    });

    it('filter fields returned', function (done) {
      UserAPI.get({fields: '_id,username'}).then(function (users) {
        users.length.should.eql(10);
        users[0]._id.should.eql('1');
        users[0].username.should.eql('user1');
        should(users[0].email).undefined();
        done();
      }).catch(done);
    });

    it('sort records by only one field', function (done) {
      UserAPI.get({sort: '-_id'}).then(function (users) {
        users.length.should.eql(10);
        // Note: '9' > '10' in terms of String
        users[0]._id.should.eql('9');
        users[0].username.should.eql('user9');
        users[0].email.should.eql('user9@yahoo.com');
        done();
      }).catch(done);
    });

    it('sort records by multiple fields', function (done) {
      UserAPI.get({sort: '-username,-email'}).then(function (users) {
        users.length.should.eql(10);
        users[3]._id.should.eql('5');
        users[3].username.should.eql('user5');
        users[3].email.should.eql('user6@yahoo.com');
        done();
      }).catch(done);
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
    beforeEach(function (done) {
      UserAPI.create(localUser).then(function (newUser) {
        done();
      });
    });

    it('update an existing user, only update modified fields', function (done) {
      var updatedUser = {
        _id: '1',
        username: 'updatedUser',
        email: 'localEmail@auction.com',
        last_name: 'localUser',
        first_name: 'updatedName',
        avatar_url: '/avatar/avatar.jpg'
      },
      options = {
        id: '1'
      },
      expectedUser = {
        username: 'updatedUser',
        email: 'localEmail@auction.com',
        last_name: 'localUser',
        first_name: 'updatedName',
        provider: 'local',
        access_token: '',
        social_account_id: '',
        address: 'Ha Noi',
        birthday: '2015-12-12',
        genre: 'male',
        avatar_url: '/avatar/avatar.jpg',
        _id: '1'
      };

      UserAPI.edit(updatedUser, options).then(function (newUser) {
        newUser.should.containEql(expectedUser);
        done();
      }).catch(done);
    });

    it('update a non-existing user, return error', function (done) {
      var updatedUser = {
        username: 'Obamama'
      },
      options = {
        id: '5'
      };

      UserAPI.edit(updatedUser, options).then(function (newUser) {
        done();
      }).catch(function (err) {
        err.should.be.an.Error;
        err.errorType.should.eql('BadRequestError');
        err.message.should.eql('User doesn\'t existed');
        done();
      });
    });

    it('update an existed email', function (done) {
      var updatedUser = {
        email: 'localUser@auction.com'
      },
      options = {
        id: '2'
      };

      UserAPI.edit(updatedUser, options).then(function (newUser) {
        done();
      }).catch(function (err) {
        err.should.be.an.Error;
        err.errorType.should.eql('BadRequestError');
        err.message.should.eql('User\'s email already existed');
        done();
      });
    });
  });

  describe('Delete', function () {
    beforeEach(function (done) {
      UserAPI.create(localUser).then(function (newUser) {
        done();
      });
    });

    it('delete an existing user', function (done) {
      var options = {id: '1'};

      UserAPI.delete(options).then(function (result) {
        result.should.be.eql(1);
        done();
      }).catch(done);
    });

    it('delete a non-existing user', function (done) {
      var options = {id: '2'};
      UserAPI.delete(options).then(function (result) {
        result.should.be.eql(0);
        done();
      }).catch(done);
    });
  });
});
