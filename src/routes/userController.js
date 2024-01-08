const express = require('express');
const User = require('../dbfiles/user');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update Users
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

// delete users
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
