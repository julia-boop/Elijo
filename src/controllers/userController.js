const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const registerValidation = require('../validations/registerValidation');
const {check, validationResult, body} = require('express-validator');

module.exports = {
    account: async function(req, res){
        let universities = await db.University.findAll();
        let institutes = await db.Institute.findAll();
        let user = await db.User.findOne({
            where:{
                id: 1
            },
            include: [{association: 'User_careers'},{association: 'User_courses'}, {association: 'Interest'}]
        })
        let genres = await db.Genre.findAll();
        let user_careers = await db.User_career_study.findAll({
            where: {
                user_id: 1
            }
        })
        let user_courses = await db.User_course_study.findAll({
            where: {
                user_id: 1
            }
        })
        //return res.send(user);
        res.render('account', {universities, institutes, user, user_careers, user_courses, genres});
    },
    register: function(req, res) {
        res.render('register');
    },
    save: function(req, res) {

        let errors = validationResult(req)

        // return res.send(errors)

        if(errors.isEmpty()){
            let newUser = {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                name: req.body.name,
                last_name: req.body.last_name,
                age: null, 
                telephone: req.body.telephone,
                adress: " ",
                location: " ", 
                experiences: " ",
                province: " ", 
                genre_id: 3, 
                photo: null, 
                rol: req.body.rol,
                user_confirm: 0, 
                created_at: new Date,
                updated_at: new Date
            }

            db.User.create(newUser)
                .then(function(result){
                    res.redirect('/')
                })
                .catch(function(e){
                    res.send(e)
                })
        }else{
            res.render('register', {errors:errors.errors})
        }



    },
    login: function(req, res) {
        res.render('login')
    },
    enter: function(req, res){
        db.User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(function(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.userSession == foundUser.id
                if(req.body.remember != undefined){
                    res.cookie('userId', foundUser.id, {maxAge: 60000})//DESPUES AGREGARLE DURACION
                }
                return res.redirect('/')
            } else {
                return res.render('login')
            }
        })
        .catch(function(e){
            return res.send(e)
        })
    },
    edit: async (req, res) => {
        let user = await db.User.findByPk(1/*req.session.userSession*/)
        .catch(err => {
            return res.send(err);
        })
        
        let userUpdate = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            telephone: req.body.telephone,
            province: req.body.province,
            genre_id: req.body.genre,
            photo: user.photo,
            experiences: req.body.experiences
        }
        if(req.files[0]){
            userUpdate.photo = req.files[0].filename;
        }

        let userUpdated = await db.User.update(userUpdate, {
            where: {
                id: 1
            }
        })
        .catch(err => {
            return res.send(err);
        })

        let interests = await db.Interest.findAll()
        .catch(err => {
            return res.send(err);
        })

        if(!Array.isArray(req.body.interests)){
            let tempInfo = req.body.interests;
            req.body.interests = [];
            req.body.interests.push(tempInfo);
        }

        let interestsToAdd = [];
        let tempInterestArr = [];
        tempInterestArr = req.body.interests;

        for(let i = 0; i < interests.length; i++){
            for(let j = 0; j < req.body.interests.length; j++){
                if(interests[i].interest_name == req.body.interests[j]){
                    interestsToAdd.push({
                        interest_id: interests[i].id,
                        user_id: 1
                    });
                    tempInterestArr[j] = null;
                }
            }
        }

        for(let i = 0; i < tempInterestArr.length; i++){
            if(tempInterestArr[i] != null && tempInterestArr[i] != ''){
                console.log(tempInterestArr[i]);
                let interestCreate = await db.Interest.create({
                    interest_name: tempInterestArr[i],
                    updated_at: Date.now()
                })
                .catch(err => {
                    return res.send(err);
                })
                interestsToAdd.push({
                    interest_id: interestCreate.id,
                    user_id: 1
                });
            }
        }
        
        for(let i = 0; i < interestsToAdd.length; i++){
            let newUserInterests = await db.User_interest.create(interestsToAdd[i])
            .catch(err => {
                return res.send(err);
            })
        }


        let destroyCareerStudies = await db.User_career_study.destroy({
            where: {
                user_id: 1
            }
        })
        for(let i = 0; i < req.body.career.length; i++){
            if(req.body.career[i] != "Selecciona una Carrera" && req.body.career[i] != '' && req.body.career[i] != null){
                let newCareer = await db.User_career_study.create({
                    career_id: req.body.career[i],
                    user_id: 1,
                    start_year: req.body.startDate[i],
                    updated_at: Date.now()
                })
            }                    
        }


        let destroyCourseStudies = await db.User_course_study.destroy({
            where: {
                user_id: 1
            }
        })
        for(let i = 0; i < req.body.course.length; i++){
            if(req.body.course[i] != "Selecciona un Curso" && req.body.course[i] != null && req.body.course[i] != ''){
                let newCourse = await db.User_course_study.create({
                    course_id: req.body.course[i],
                    user_id: 1,
                    start_year: req.body.courseStartDate[i],
                    updated_at: Date.now()
                })
            }
        }

        return res.redirect('/user/account/'+userUpdated.id);
    },
    requestInstitution: (req, res) => {
        db.User.findByPk(1)
        .then( user => {
            //return res.send(user);
            return res.render('requestNewInstitution', {user});
        })
        .catch(error => {
            return res.send(error);
        })
        
    },
    sendRequest: (req, res) => {
        return res.send(req.body);
    }
};