const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

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
        //return res.send(user);
        res.render('account', {universities, institutes, user});
    },
    register: function(req, res) {
        res.render('register');
    },
    save: function(req, res) {
        res.send('Usuario guardado!!!')
    },
    login: function(req, res) {
        res.render('login')
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
            genre: req.body.genre,
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




        if(req.body.career != null || req.body.career != ''){
            for(let i = 0; i < req.body.career.length; i++){
                let newCareer = await db.User_career_study.create({
                    career_id: req.body.career[i],
                    user_id: 1,
                    updated_at: Date.now()
                })

            }
        }

        if(req.body.career != null || req.body.career != ''){
            let destroyStudies = await db.User_career_study.destroy({
                where: {
                    user_id: 1
                }
            })
            if(Array.isArray(req.body.career)){
                for(let i = 0; i < req.body.career.length; i++){
                    let newCareer = await db.User_career_study.create({
                        career_id: req.body.career[i],
                        user_id: 1,
                        updated_at: Date.now()
                    })
                }
            }else{
                let newCareer = await db.User_career_study.create({
                    career_id: req.body.career,
                    user_id: 1
                })
                .catch(err => {
                    return res.send(err);
                })
            }
        }

        if(req.body.course != null || req.body.course != ''){
            let destroyStudies = await db.User_course_study.destroy({
                where: {
                    user_id: 1
                }
            })
            if(Array.isArray(req.body.course)){
                for(let i = 0; i < req.body.course.length; i++){
                    let newCourse = await db.User_course_study.create({
                        course_id: req.body.course[i],
                        user_id: 1,
                        updated_at: Date.now()
                    })
                }
            }else{
                let newCourse = await db.User_course_study.create({
                    course_id: req.body.course,
                    user_id: 1
                })
                .catch(err => {
                    return res.send(err);
                })
            }
        }

        return res.redirect('/user/account/'+userUpdated.id);
    }
};