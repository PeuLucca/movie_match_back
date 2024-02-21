const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// post
router.post('/validateUser', usersController.validateUser);
router.post('/createUser', usersController.createUser);

module.exports = router;