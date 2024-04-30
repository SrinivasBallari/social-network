const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userProfileRoutes = require('./user-profile');

router.use('/auth',authRoutes);
router.use('/user-profile',userProfileRoutes);

module.exports = router;
