const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  username: String,
  password: { type: String, required: false },
  name: String,
  email: String,
  age: { type: Number, required: false },
  googleId: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
