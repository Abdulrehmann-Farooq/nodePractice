const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: { type: String, required: false },
  name: String,
  email: String,
  age: { type: Number, required: false },
  googleId: { type: String, required: false },
  versionKey: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
