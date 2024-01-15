require('dotenv').config();

const {
  CONNECTION_STRING: connectionString,
  SECRET_KEY: secretKey,
  clientID,
  clientSecret,
  callback,
} = process.env;

module.exports = {
  connectionString,
  secretKey,
  clientID,
  clientSecret,
  callback,
};
