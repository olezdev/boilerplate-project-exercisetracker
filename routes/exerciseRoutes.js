const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/:_id/exercises', exerciseController.addExercise);

module.exports = router;