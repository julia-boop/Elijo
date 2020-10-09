const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');   
const registerValidation = require('../validations/registerValidation');

const userController = require('../controllers/userController.js');

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function(req, file, cb){
        cb(null, req.body.email + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage:storage});

router.get('/account/:userID', userController.account);
router.post('/account/:userID', upload.any() ,userController.edit);

//SHOW REGISTER FORM:
router.get('/register', userController.register);
//SAVE USER
router.post('/register', registerValidation, userController.save);

//LOGIN
router.get('/login', userController.login);

router.get('/requestInstitution', userController.requestInstitution);
router.post('/requestInstitution', userController.sendRequest);


module.exports = router;