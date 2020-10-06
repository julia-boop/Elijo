const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const University = require('../database/models/University');

module.exports = {

    json:function(req, res) {
        db.Institute.findAll()
        .then(function(result) {
            res.json(result)
        })
    },

    home: function(req, res){
        res.render('home');
    },
    meet: function(req, res){
        
        db.User.findAll({
            where: {rol: 2},//'2' debe ser reemplazado por el rol que corresponda a estudiantes
            include: [{association: 'User_careers'}, {association: 'User_courses'}]
        })
        .then(function(userStudies) {
            //return res.json(userStudies) //Llegan usuarios rol 2 perfectamente como "userStudies"
            for(i = 0; i < userStudies.length; i++) {
                if(userStudies[i].User_careers) {
                    db.Career.findAll({
                        where: userStudies[i].User_careers.university_id,//se rompe si no tiene career
                        include: [{association: 'Universities'}]
                    })
                    .then(function(careerResult){
                        //return res.json(careerResult);//llega carrera como array
                        return res.render('meet', {careerResult:careerResult, userStudies:userStudies})
                    })
                } else {
                    for(i = 0; i < userStudies.length; i++) {
                    db.Course.findAll({
                        where: userStudies.User_courses[i].institute_id,//se rompe si no tiene career, ni course
                        include: [{association: 'Institutes'}]
                    })
                    .then(function(courseResult){
                        return res.render('meet', {courseResult:courseResult, userStudies:userStudies})
                    })
                }
                }
            }
            //res.render('meet', {meetUsers:meetUsers});
        })
        
        //         db.User_career_study.findAll({
        //             where: {
        //                 user_id: meetUser.id
        //             }
        //         })
        //         .then(function(meetUser) {
        //             db.User_course_study.findAll({
        //                 where: {
        //                     user_id: meetUser.id
        //                 }
        //             })
        //         .then(function(meetUser) {
        //         })
        //     })
        // })
        // res.render('meet')
    },
    detail: function(req, res, next) {
        res.render('detail')
    },
    why : function(req, res){
        res.render('why')
    },
    posta: function(req, res) {
        res.render('posta')
    }
};