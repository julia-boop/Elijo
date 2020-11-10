const express = require('express');
const router = express.Router();
const endpointController = require('../controllers/endpointController.js');
const hasAcces = require('../middlewares/hasAccess');


router.get('/careers/:universityOwner', endpointController.getCareers);
router.get('/courses/:instituteOwner', endpointController.getCourses);

router.get('/institute', endpointController.getInstitutes);
router.get('/university', endpointController.getUniversities);

router.get('/institute/:instituteID', endpointController.getSpecificInstitutes);
router.get('/university/:universityID', endpointController.getSpecificUniversities);
router.get('/course/:courseID', endpointController.getSpecificCourse);
router.get('/career/:careerID', endpointController.getSpecificCareer);

router.get('/institute/:instituteID/opinions', endpointController.getInstituteOpinions);
router.get('/university/:universityID/opinions', endpointController.getUniversityOpinions);
router.get('/institute/study/:courseID/opinions', endpointController.getCourseOpinions);
router.get('/university/study/:careerID/opinions', endpointController.getCareerOpinions);

router.get('/user/', hasAcces, endpointController.getActualUser);
router.get('/interests', endpointController.getInterestsTable);


module.exports = router;