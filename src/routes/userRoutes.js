const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../login/middleware');

const router = express.Router();

router.get('/', authenticateToken, userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
