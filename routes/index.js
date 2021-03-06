const express = require('express');
const router = express.Router();
const { login, signup, getQuizes, addQuiz, editQuiz, deleteQuiz, submitResponse, getResponses } = require('../controllers');
router.post('/login', login);
router.post('/register', signup);
router.post('/getQuizes', getQuizes);
router.post('/addQuiz', addQuiz);
router.post('/editQuiz', editQuiz);
router.post('/deleteQuiz', deleteQuiz);
router.post('/submitResponse', submitResponse);
router.post('/getResponses', getResponses);
module.exports = router;