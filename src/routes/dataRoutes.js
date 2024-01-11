const express = require('express');
const dataController = require('../controllers/dataController');
const authenticateToken = require('../login/middleware');

const router = express.Router();

router.get('/', authenticateToken, dataController.getData);
router.post('/', authenticateToken, dataController.createData);
router.put('/:id', authenticateToken, dataController.updateData);
router.delete('/:id', authenticateToken, dataController.deleteData);

module.exports = router;
