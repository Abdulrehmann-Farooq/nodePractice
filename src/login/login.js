const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../dbfiles/user');
const { secretKey } = require('../dbfiles/dbConfig');

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return { token, userId: user.id };
  } catch (error) {
    console.error(error);
    return 'error';
  }
};

module.exports = login;
