module.exports = function (grunt) {
  // Config: grunt.config({});

  // Initiate data for mongo db
  grunt.registerTask('initDB', 'initiate mongo database', function () {
    console.log('init database mongo');
  });
};
