const express = require('express');
const router = express.Router();
const UserController  = require('../../controllers/user-contoller');
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

module.exports = router;