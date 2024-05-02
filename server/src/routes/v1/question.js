const express = require('express');
const router = express.Router();
const QuestionController = require('../../controllers/question-controller')
const {validateAuthToken} = require('../../middleware/validateAuthToken');

router.post(
    '/ask',
    validateAuthToken,
    QuestionController.askQuestion
);

router.post(
    '/:questionId/answers',
    validateAuthToken,
    QuestionController.answerQuestion
);

module.exports = router;