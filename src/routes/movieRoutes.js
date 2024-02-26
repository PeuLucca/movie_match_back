const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');

// get
router.get('/all', movieController.allMovies);
router.get('/firstVoting', movieController.firstVoting);

// post
router.post('/create', movieController.createMovie);
router.post('/movieVote', movieController.movieVote);

module.exports = router;