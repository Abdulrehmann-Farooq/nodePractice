const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../dbfiles/user');
const { secretKey } = require('../dbfiles/dbConfig');

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      secretKey,
      { expiresIn: '1h' },
    );
    return {
      success: true, token, userId: user.id, username: user.username,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred' };
  }
};

module.exports = login;
