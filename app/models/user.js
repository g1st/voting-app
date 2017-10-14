const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
});

// generating a hash
userSchema.methods.generateHash = (password) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt, null);
};

// checking if password is valid
userSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
