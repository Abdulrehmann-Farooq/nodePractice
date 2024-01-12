require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;
const secretKey = process.env.SECRET_KEY;

module.exports = {
  connectionString,
  secretKey,
};
