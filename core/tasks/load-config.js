var config = require('../server/config');

module.exports = function (grunt) {
  grunt.registerTask('loadConfig', 'Load config file based on NODE_ENV', function () {
    config.load(config.configPath);
  });
};
