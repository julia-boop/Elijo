const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '../controllers/userController.js'));


router.get('/account', userController.account);

router.get('/register', userController.register);



module.exports = router;