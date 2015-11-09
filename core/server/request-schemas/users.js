// User request schema corresponding to REST methods
module.exports = {
  GET: {
    params: {
      id: {
        length: {maximum: 255}
      }
    },
    query: {
      page: {numericality: true},
      perpage: {numericality: true}
    }
  },

  POST: {
    body: {
      username: {
        presence: true,
        length: {maximum: 255}
      },
      email: {
        email: true
      },
      display_name: {
        presence: true,
        length: {maximum: 255}
      },
      password: function (value, attributes) {
        if (attributes.provider === 'local') {
          return {presence: true};
        }
      },
      avatar: {},
      genre: {},
      birthday: {
        format: {
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          message: 'must have the format like \'YYYY-MM-DD\''
        }
      },
      provider: {},
      social_id: {}
    }
  },

  PUT: {
    username: {
      length: {maximum: 255}
    },
    email: {
      email: true
    },
    birthday: {
      format: {
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        message: 'must have the format like \'YYYY-MM-DD\''
      }
    }
  },

  DELETE: {
    params: {
      id: {
        presence: true
      }
    }
  }
};
