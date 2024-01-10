const express = require('express');
const login = require('../login/login');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await login(username, password);
    if (result.error) {
      let message = 'Authentication failed';
      let statusCode = 401;
      if (result.error === 'User not found' || result.error === 'Invalid credentials') {
        message = result.error;
      } else if (result.error === 'Internal server error') {
        statusCode = 500;
        message = 'Internal server error';
      }
      return res.status(statusCode).json({ message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
  return null;
});
