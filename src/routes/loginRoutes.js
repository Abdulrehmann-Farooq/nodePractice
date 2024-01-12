const express = require('express');
const login = require('../login/login');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const result = await login(username, password);

  if (!result.success) {
    // Decide on the status code based on the error message
    const statusCode = result.message === 'User not found' ? 404 : 401;
    return res.status(statusCode).json({ message: result.message });
  }

  return res.json({ token: result.token, userId: result.userId, username: result.username });
});

module.exports = router;
