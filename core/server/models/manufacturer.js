var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid'),
    ManufacturerSchema;

ManufacturerSchema = new Schema({
  _id: {type: String, default: uuid.v1},
  slug: {type: String},
  name: {type: String},
  email: {type: String},
  phone: {type: String},
  address: {}
});

ManufacturerSchema.index({_id: 1}, {unique: true});
ManufacturerSchema.index({slug: 1}, {unique: true});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
