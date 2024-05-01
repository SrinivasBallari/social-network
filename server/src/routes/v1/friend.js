const express = require('express');
const router = express.Router();
const FriendController = require('../../controllers/friend-controller')
const {validateAuthToken} = require('../../middleware/validateAuthToken');

router.post(
    '/send',
    validateAuthToken,
    FriendController.postFriendRequest
)

router.put(
    '/respond',
    validateAuthToken,
    FriendController.respondToFriendRequest
)

module.exports = router;