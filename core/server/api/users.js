var Promise = require('bluebird'),
    _       = require('lodash'),
    models  = require('../models'),
    errors  = require('../errors');

module.exports = {

  /**
   * Find a paginated set of users
   * @public
   * @param {{options}} options (optional)
   * Ex: options: {
   *  criteria: {name: 'user'},
   *  filter: {name: true, age: true}
   *  extra: {skip: 5, limit: 10, sort: {created_at: -1}}
   * }
   * @returns {Promise<Users>} Users Collection with Meta
   */
  get: function (options) {
    /**
     * @param {{options}}
     */
    options = options || {};

    var criteria = {},
        fields,
        sort = {},
        page = options.page || 0,
        perpage = options.perpage || null,
        expr;

    if (options.fields) {
      fields = options.fields.replace(/,/g, ' ');
    }

    if (options.q) {
      expr = new RegExp('.*' + options.q + '.*');
      criteria.$or = [
        {name: expr},
        {email: expr}
      ];
    }

    if (options.sort) {
      sort = options.sort.replace(/,/g, ' ');
    }

    return models.User.find(criteria, fields)
      .sort(sort)
      .skip((page - 1) * perpage)
      .limit(perpage)
      .exec();
  },

  create: function (user, options) {
    return models.User.findOne({email: user.email}).then(function (result) {
      if (result) {
        return Promise.reject(new errors.BadRequestError('User\'s email already existed'));
      } else {
        var dbUser = new models.User(user);
        return dbUser.save();
      }
    });
  },

  edit: function (user, options) {
    // If email existed
    return models.User.findOne({email: user.email, _id: {$ne: options.id}}).then(function (result) {
      if (result) {
        return Promise.reject(new errors.BadRequestError('User\'s email already existed'));
      } else {
        return models.User.findOne({_id: options.id});
      }
    }).then(function (updatedUser) {
      if (!updatedUser) {
        return Promise.reject(new errors.BadRequestError('User doesn\'t existed'));
      }
      _.merge(updatedUser, user);
      return updatedUser.save();
    });
  },

  show: function (options) {
  },

  delete: function (options) {
    return models.User.remove({_id: options.id}).then(function (result) {
      return result.result.n;
    });
  }
};
