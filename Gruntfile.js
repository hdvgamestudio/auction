module.exports = function (grunt) {
  grunt.initConfig({
    watch: {
      express: {
        files: ['core/auction-server.js', 'core/server/**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    },

    express: {
      options: {
        script: 'index.js',
        output: 'Auction server is running'
      },
      dev: {},
      prod: {},
      test: {
        options: {
          node_env: 'testing'
        }
      }
    },

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

  // `grunt validate` is called by `npm test` and is used by Travis.
  grunt.registerTask('validate', 'Run tests and lint code',
    ['init', 'lint', 'test-all']);

  // Linting
  grunt.registerTask('lint', ['jshint', 'jscs']);

  // Test setup
  grunt.registerTask('test-setup', 'Setup ready to run test',
    ['loadConfig', 'setTestEnv']
  );

  // Test all
  grunt.registerTask('test-all', 'Run tests and lint code',
    ['test-unit', 'test-integration']);

  // Test unit
  grunt.registerTask('test-unit', 'Run unit tests (mocha)',
    ['test-setup', 'mochaTest:unit', 'cleanTest']
  );

  // Test integration
  grunt.registerTask('test-integration', 'Run integration tests (mocha)',
    ['test-setup', 'mochaTest:integration', 'cleanTest']
  );

  // Init environment for development
  grunt.registerTask('init', 'Prepare the project for development', function () {
  });

  // Task to be executed when releasing a new version
  grunt.registerTask('release', [
    'init'
  ]);
};
