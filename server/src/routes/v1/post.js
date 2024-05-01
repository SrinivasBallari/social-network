const express = require('express');
const router = express.Router();
const PostController  = require('../../controllers/post-controller');
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
    '/create-post',
    validateAuthToken,
    upload.any(),
    PostController.createPost    
);

module.exports = router;