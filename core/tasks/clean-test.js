var db = require('../server/db');

module.exports = function (grunt) {
  grunt.registerTask('cleanTest', 'clean db and close connection', function () {
    var done = this.async();
    db.dropDatabase().then(function () {
      db.close();
      done();
    }).catch(function (err) {
      done();
    });
  });
};
