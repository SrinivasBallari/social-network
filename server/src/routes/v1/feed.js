const express = require('express');
const router = express.Router();
const FeedController = require('../../controllers/feed-controller')
const {validateAuthToken} = require('../../middleware/validateAuthToken');

router.get(
    '/suggested-users',
    validateAuthToken,
    FeedController.getSuggestedUsers
);

// router.post(
//     '/:questionId/answers',
//     validateAuthToken,
//     QuestionController.answerQuestion
// );

module.exports = router;