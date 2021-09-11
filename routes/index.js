const express = require('express');
const router = express.Router();
const { login, signup, getQuizes, addQuiz } = require('../controllers');
router.post('/login', login);
router.post('/register', signup);
router.post('/getQuizes', getQuizes);
router.post('/addQuiz', addQuiz);

module.exports = router;