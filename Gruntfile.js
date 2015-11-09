module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },

      client: [
      'core/client/**/*.js',
      '!core/client/node_modules/**/*.js',
      '!core/client/bower_components/**/*.js',
      '!core/client/tmp/**/*.js',
      '!core/client/dist/**/*.js',
      '!core/client/vendor/**/*.js'
      ],

      server: [
        '*.js',
        '!config*.js',
        'core/*.js',
        'core/server/**/*.js',
        'core/tasks/**/*.js',
        'core/shared/**/*.js',
        'core/test/**/*.js',
        '!core/test/coverage/**',
        '!core/shared/vendor/**/*.js'
      ]
    },

    jscs: {
      options: {
        config: true
      },

      client: {
        options: {
          esnext: true,
          disallowObjectController: true
        },

        files: {
          src: [
            'core/client/**/*.js',
            '!core/client/node_modules/**/*.js',
            '!core/client/bower_components/**/*.js',
            '!core/client/tmp/**/*.js',
            '!core/client/dist/**/*.js',
            '!core/client/vendor/**/*.js'
          ]
        }
      },

      server: {
        files: {
          src: [
            '*.js',
            '!config*.js',
            'core/*.js',
            'core/server/**/*.js',
            'core/tasks/**/*.js',
            'core/shared/**/*.js',
            'core/test/**/*.js',
            '!core/test/coverage/**',
            '!core/shared/vendor/**/*.js'
          ]
        }
      }
    },

    mochaTest: {
      unit: {
        src: ['core/test/unit/**/*_spec.js']
      },
      integration: {
        src: ['core/test/integration/**/*_spec.js']
      }
    }
  });

  // Load all tasks in tasks folder
  grunt.loadTasks('./core/tasks');

  // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['lint', 'mochaTest']);

  // Linting
  grunt.registerTask('lint', ['jshint', 'jscs']);

  // Init environment for development
  grunt.registerTask('init', 'Prepare the project for development',
  ['default']);

  // Task to be run when releasing a new version
  grunt.registerTask('release', [
    'init'
  ]);
};
