const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require(path.join(__dirname, '../controllers/userController.js'));


router.get('/account', mainController.account);


module.exports = router;