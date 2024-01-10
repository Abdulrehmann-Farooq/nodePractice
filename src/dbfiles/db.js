const mongoose = require('mongoose');
const { connectionString } = require('./dbConfig');

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
