var mongoose = require('mongoose')
const { Schema } = require('../db');

// PENDING APPROVAL
var user = new Schema({
  first: String,
  last: String,
  profileUrl: String,
  trustScore: Number,
});


// Compile model from schema
var User = mongoose.model('User', user );

module.exports = {
  User
}