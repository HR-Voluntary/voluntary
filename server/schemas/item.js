var mongoose = require('mongoose');
const { Schema } = require('../db.js');
// const { User } = require('../schemas/user.js');

// PENDING APPROVAL
var item = new Schema({
  name: String,
  photoUrl: String,
  description: String,
  category: String,
  isActive: { type: Boolean, default: true },
  userObjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

// POTENTIAL ATTRIBUTES TO ADD TO SCHEMA...
// CONDITION ("new, old, etc")
// NUMBER OF ITEMS


// Compile model from schema
var Item = mongoose.model('Item', item );

module.exports = {
  Item
};