const express = require('express');
const router = express.Router();
const path = require('path');
const endpointController = require('../controllers/endpointController.js');



router.get('/careers/:universityOwner', endpointController.getCareers);
router.get('/courses/:instituteOwner', endpointController.getCourses);
router.get('/user/:userID', endpointController.getActualUser);
router.get('/interests', endpointController.getInterestsTable);



module.exports = router;