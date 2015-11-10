module.exports = function (grunt) {
  grunt.registerTask('setTestEnv',
    'Use "testing" Auction config; unless we are running on travis (then show queries for debugging)',
    function () {
      process.env.NODE_ENV = process.env.TRAVIS ? process.env.NODE_ENV : 'testing';
    });
};
