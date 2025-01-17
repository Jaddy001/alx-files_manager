const express = require('express');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Existing routes
router.post('/users', UsersController.postNew);

// New authentication routes
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

module.exports = router;

