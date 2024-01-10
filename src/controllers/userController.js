const User = require('../dbfiles/user');

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Create a new user
const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Update Users
const updateUser = async (req, res) => {
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
};

// delete users
const deleteUser = async (req, res) => {
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
};
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};