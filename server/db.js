//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection:
var mongoDB = `mongodb+srv://Jimmy123:Jimmy123@cluster0.ff0zm.mongodb.net/Voluntary?retryWrites=true&w=majority`;

// Connects to mongo:
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection and handles errors:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

// EXPORTING SCHEMA TO ITS CORRESPONDING MODEL FOLDER
module.exports = {
  Schema
};