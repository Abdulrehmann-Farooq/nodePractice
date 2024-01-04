const express = require('express');
const user=require("../dbfiles/user");
const router = express.Router();


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
