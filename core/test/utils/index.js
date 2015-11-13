var Promise       = require('bluebird'),
    _             = require('lodash'),
    path          = require('path'),
    uuid          = require('node-uuid'),
    API           = require('./api'),
    config        = require('../../server/config'),
    db            = require('../../server/db/'),
    initData,
    clearData,
    teardown,
    setup;

/** Test Utility Functions **/
initData = function () {
  /*
   * return migration.init();
   */
};

clearData = function () {
  /*
   * We must always try to delete all migrated data
   * return migration.reset();
   */
};

teardown = function (done) {
  db.dropDatabase().then(function () {
    done();
  }).catch(done);
};

setup = function () {
  var self = this,
      args = arguments;

  return function (done) {
    // ToDo
    /*
    return Models.init().then(function () {
        return initFixtures.apply(self, args);
    }).then(function () {
        done();
    }).catch(done);
    */
    done();
  };
};

module.exports = {
  API: API,
  initData: initData,
  clearData: clearData,
  teardown: teardown,
  setup: setup
};
