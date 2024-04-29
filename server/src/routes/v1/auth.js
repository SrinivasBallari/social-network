const express = require('express');
const router = express.Router();
const UserController  = require('../../controllers/user-contoller')

router.post(
    '/register',
    UserController.register
);

router.post(
    '/login',
    UserController.login
);

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);

module.exports = router;