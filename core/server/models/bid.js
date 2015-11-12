var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid'),
    BidSchema;

BidSchema = new Schema({
  _id: {type: String, default: uuid.v1},
  user_id: {type: String},
  username: {type: String},
  price: {type: Number},
  time: {type: Date, default: Date.now}
});

BidSchema.index({_id: 1}, {unique: true});
BidSchema.index({user_id: 1});

module.exports = mongoose.model('Bid', BidSchema);
