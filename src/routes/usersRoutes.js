const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// get
router.get('/validateUser', usersController.validateUser);

// post
router.post('/createUser', usersController.createUser);

module.exports = router;