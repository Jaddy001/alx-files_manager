const express = require('express');
const router = express.Router();
const FilesController = require('../controllers/FilesController');

// POST /files => FilesController.postUpload
router.post('/files', FilesController.postUpload);

module.exports = router;

