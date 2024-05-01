const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userProfileRoutes = require('./user-profile');
const friendRequestsRoutes = require('./friend');
const postRoutes = require('./post');

router.use('/auth',authRoutes);
router.use('/user-profile',userProfileRoutes);
router.use('/friend-request',friendRequestsRoutes);
router.use('/posts',postRoutes);

module.exports = router;
