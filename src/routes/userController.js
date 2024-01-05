const express = require('express');
const user=require("../dbfiles/user");
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  
  const users = await user.find({});
  try {
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a new user
router.post('/users', async(req, res) => {
  
  const newUser=new user(req.body);

  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


//update users
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await user.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


//delete users
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


module.exports = router;
