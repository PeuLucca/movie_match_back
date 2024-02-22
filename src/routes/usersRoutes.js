const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// post
router.post('/validate', usersController.validateUser);
router.post('/create', usersController.createUser);

module.exports = router;