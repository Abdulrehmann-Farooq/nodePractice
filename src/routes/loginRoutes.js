const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const login = require('../login/login');
const { secretKey } = require('../dbfiles/dbConfig');

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

// Route to initiate Google OAuth login
router.post(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// Google OAuth callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign(
      {
        userId: req.user.id,
        username: req.user.username,
      },
      secretKey,
      { expiresIn: '1h' },
    );

    // Send the JWT and user info in JSON format
    res.json({
      success: true,
      token,
      userId: req.user.id,
      username: req.user.username,
    });
  },
);

module.exports = router;
