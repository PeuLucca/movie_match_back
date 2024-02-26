const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// get
router.post('/returnUser', usersController.getUser);

// post
router.post('/validate', usersController.validateUser);
router.post('/create', usersController.createUser);

module.exports = router;