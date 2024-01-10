const jwt = require('jsonwebtoken');
const { secretKey } = require('../dbfiles/dbConfig'); // Import your secretKey

const authenticateToken = (req, res, next) => {
  // Retrieve the token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // No token provided
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Invalid token
    }

    // If the token is valid, add the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware/route handler
    return null;
  });
  return null;
};
module.exports = authenticateToken;