'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;


var userSchema = new Schema({
  username: String,
  password: String
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  var salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt, null);
};

// checking if password is valid (named function for proper this scope)
userSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);