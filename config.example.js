// # Ghost Configuration

var path = require('path'),
  config;

config = {
  // ### Production
  production: {
    // The url to use when providing links to the site, E.g. in RSS and email.
    url: 'http://localhost:2368',

    // Example mail config
    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          user: '', // mailgun username
          pass: ''  // mailgun password
        }
      }
    },

    // #### Database
    mongoDb: {
      host     : '127.0.0.1',
      port     : 27017,
      db:       'auctionDev',
      user     : 'auction',
      password : 'auction',
      connection: 'mongodb://127.0.0.1:27017/auction'
    },
    // #### Server
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: '127.0.0.1',
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: '3000'
    },
    // #### Redis database
    redisServer: {
      host: '127.0.0.1',
      port: '6379'
    }
  },

  // ### Development **(default)**
  development: {
    // The url to use when providing links to the site, E.g. in RSS and email.
    url: 'http://localhost:2368',

    // Example mail config
    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          user: '', // mailgun username
          pass: ''  // mailgun password
        }
      }
    },

    // #### Database
    mongoDb: {
      host     : '127.0.0.1',
      port     : 27017,
      db:       'auctionDev',
      user     : 'auction',
      password : 'auction',
      connection: 'mongodb://127.0.0.1:27017/auction'
    },
    // #### Server
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: '127.0.0.1',
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: '3000'
    },
    // #### Redis database
    redisServer: {
      host: '127.0.0.1',
      port: '6379'
    }
  },

  // **Developers only need to edit below here**

  // ### Testing
  // Uses a different port number
  testing: {
    url: 'http://127.0.0.1:2369',
    server: {
      host: '127.0.0.1',
      port: '2369'
    },
    mongoDb: {
      host:     '127.0.0.1',
      port:     27017,
      db:       'auctionTest',
      user:     'auction',
      password: 'auction',
      connection: 'mongodb://127.0.0.1:27017/auctionTest'
    },
    redisServer: {
      host: '127.0.0.1',
      port: '6379'
    },
    logging: false
  }
};

module.exports = config;
