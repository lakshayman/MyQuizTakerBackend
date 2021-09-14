const express = require('express');
const router = express.Router();
const { login, signup, getQuizes, addQuiz, editQuiz, deleteQuiz } = require('../controllers');
router.post('/login', login);
router.post('/register', signup);
router.post('/getQuizes', getQuizes);
router.post('/addQuiz', addQuiz);
router.post('/editQuiz', editQuiz);
router.post('/deleteQuiz', deleteQuiz);

module.exports = router;