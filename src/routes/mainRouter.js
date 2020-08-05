const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require(path.join(__dirname, '../controllers/mainController.js'));


router.get('/', mainController.home);


module.exports = router;