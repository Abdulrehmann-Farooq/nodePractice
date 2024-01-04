const express = require('express');
const user=require("../dbfiles/user");
const router = express.Router();


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

module.exports = router;
