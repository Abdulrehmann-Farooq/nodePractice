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

module.exports = router;
