const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

module.exports = {
    //TEST
    jsonInstitutes:function(req, res) {
        db.Institute.findAll({
            include: [{association: 'Courses'}]
        })
        .then(function(result) {
            res.json(result)
        })
    },
    jsonUniversities:function(req, res) {
        db.University.findAll({
            include: [{association: 'Careers'}, {association: 'Asignatures'}]
        })
        .then(function(result) {
            res.json(result)
        })
    },
    //TEST

    home: function(req, res){
        res.render('home');
    },
    meet: async function(req, res){
        let userStudies = await db.User.findAll({
            where: {rol: 2},//'2' debe ser reemplazado por el rol que corresponda a estudiantes
            include: [{association: 'User_careers'}, {association: 'User_courses'}]
        })
        let universityCareers = await db.Career.findAll({
            include: [{association: 'Universities'}]
        })
        let instituteCourses = await db.Course.findAll({
            include: [{association: 'Institutes'}]
        })
        //return res.send(userStudies);
        res.render('meet', {userStudies:userStudies, universityCareers:universityCareers, instituteCourses:instituteCourses});
    },
    detail: async function(req, res) {
        let user = await db.User.findOne({
            where: {
                id: req.params.ProfileId
            },
            include: [{association: 'User_careers'}, {association: 'User_courses'}, {association: 'Interest'}, {association: 'User_tips'}]
        })
        
        //#region STUDIES REQUEST
        let university_career = [];
        for(let i = 0 ; i < user.User_careers.length ; i++){
            let career = await db.University.findOne({
                include: [
                    {
                        association: 'Careers', 
                        where: {
                            id: user.User_careers[i].id
                        }
                    }
                ]
            });
            university_career.push(career);
        }
        
        let institute_courses = [];
        for(let i = 0; i < user.User_courses.length; i++){
            let institute = await db.Institute.findOne({
                include: [
                    {
                        association: 'Courses', 
                        where: {
                            id: user.User_courses[i].id
                        }
                    }
                ]
            });
            institute_courses.push(institute);
        }
        //#endregion
        
        res.render('detail', {user, university_career, institute_courses})
    },
    why : function(req, res){
        res.render('why')
    },
    posta: function(req, res) {
        res.render('posta')
    }
};