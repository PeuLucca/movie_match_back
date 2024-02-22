const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

// get
router.get('/all', movieController.allMovies);

// post
router.post('/create', movieController.createMovie);

module.exports = router;