var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid'),
    BidBonusSchema;

BidBonusSchema = new Schema({
  _id: {type: String, default: uuid.v1},
  product_id: {type: Schema.ObjectId},
  user_id: {type: Schema.ObjectId},
  bonus: {type: Number},
  remaining: {type: Number}
});

BidBonusSchema.index({_id: 1}, {unique: true});
BidBonusSchema.index({user_id: 1});
BidBonusSchema.index({product_id: 1});

module.exports = mongoose.model('BidBonus', BidBonusSchema);
