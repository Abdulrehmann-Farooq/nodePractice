const express = require('express');
const user=require("../dbfiles/user");
const router = express.Router();

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

module.exports = router;
