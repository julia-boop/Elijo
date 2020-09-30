const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const populationController = require('../controllers/populationController');

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/logos'));
    },
    filename: function(req, file, cb){
        cb(null, req.body.logoInput + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage:storage});

router.get('/university', populationController.showUniversityForm);
router.post('/university', upload.any(), populationController.saveNewUniversity);
router.get('/addCareerAsignature/:universityId', populationController.showCareerAndAsignatureForm);
router.post('/addCareerAsignature/:universityId', populationController.addCareerAndASignatures);


router.get('/institute', populationController.showInstituteForm);
router.post('/institute', upload.any(), populationController.saveNewInstitute);

module.exports = router;