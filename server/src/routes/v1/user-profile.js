const express = require('express');
const router = express.Router();
const UserController  = require('../../controllers/user-contoller');
const FeedController = require('../../controllers/feed-controller');
const {validateAuthToken} = require('../../middleware/validateAuthToken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post(
    '/upload/bank-statements',
    validateAuthToken,
    upload.any(),
    UserController.uploadBankStatements    
);

router.put(
  '/update',
   validateAuthToken,
   UserController.updateUserProfile
);

router.get(
  '/feed',
  validateAuthToken,
  FeedController.getUserFeed
);

module.exports = router;