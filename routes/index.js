const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// Define routes
router.post('/users', UsersController.postNew);

module.exports = router;

