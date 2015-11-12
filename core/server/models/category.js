var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid'),
    CategorySchema;

CategorySchema = new Schema({
  _id: {type: String, default: uuid.v1},
  slug: {type: String},
  name: {type: String},
  description: {type: String},
  ancestors: [{
    name: {type: String},
    category_id: {type: Schema.ObjectId}
  }],
  parent_id: {type: Schema.ObjectId}
});

CategorySchema.index({_id: 1}, {unique: true});
CategorySchema.index({_slug: 1}, {unique: true});

module.exports = mongoose.model('Category', CategorySchema);
