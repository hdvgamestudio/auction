var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema,
    oAuthTypes;

mongoose.Promise = require('bluebird');

oAuthTypes = [
  'facebook',
  'twitter',
  'google'
];

/**
 * User Schema
 */

UserSchema = new Schema({
  username: {type: String, default: ''},
  email: {type: String, default: ''},
  display_name: {type: String, default: ''},
  avatar: {type: String},
  genre: {type: String},
  birthday: {type: String},
  provider: {type: String, default: ''}, // 'local', 'facebook', 'twitter', 'google'
  authToken: {type: String, default: ''},
  hashed_password: {type: String},
  created_at: {type: Date, default: Date.now},
  modified_at: {type: Date},
  facebook: {},
  twitter: {},
  google: {}
});

/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
});

/**
 * Instance Methods
 */

UserSchema.methods = {
};

/**
 * Static Methods
 */

UserSchema.statics = {
};

/**
 * Exports User model
 */

module.exports = mongoose.model('User', UserSchema);
