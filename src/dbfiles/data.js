const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  username: String,
  email: String,
  data: String,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
