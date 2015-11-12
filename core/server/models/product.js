var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid'),
    ProductSchema;

ProductSchema = new Schema({
  _id: {type: String, default: uuid.v1},
  slug: {type: String},
  sku: {type: String},
  name: {type: String},
  description: {type: String},
  pricing: {
    sale: {type: Number},
    retail: {type: Number}
  },
  manufacturer: {
    manufacturer_id: {type: String, ref: 'Manufacturer'},
    name: {type: String}
  },
  image_url: {type: String},
  catetory_ids:[{type: Schema.ObjectId, ref: 'Category'}],
  tags: [{type: String}],
  created_at: {type: Date},
  modified_at: {type: Date},
  bid_info: {
    start: {type: Date},
    end: {type: Date},
    lowest_price: {type: Number},
    highest_price: {type: Number}
  }
});

ProductSchema.index({_id: 1}, {unique: true});
ProductSchema.index({slug: 1}, {unique: true});
ProductSchema.index({'manufacturer.manufacturer_id': 1});

module.exports = mongoose.model('Product', ProductSchema);
