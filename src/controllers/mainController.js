const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const usersFilter = require('../ownModules/filterUsers.js');


function duplicateCleaner(careers, courses){
    let careersCleaned = [];
    for(let i=0; i<careers.length; i++){
        if(!careersCleaned.includes(careers[i].name)){
            careersCleaned.push(careers[i].name)
        }
    }
    careersCleaned = careersCleaned.map(element => ({name:element}));
    careers=careersCleaned;

    let coursesCleaned = [];
    for(let i=0; i<courses.length; i++){
        if(!coursesCleaned.includes(courses[i].name)){
            coursesCleaned.push(courses[i].name)
        }
    }
    coursesCleaned = coursesCleaned.map(element => ({name:element}));
    courses=coursesCleaned;

    return [careers, courses]

}


module.exports = {
    
    
    // --> DATAENTRY <-- \\
    jsonInstitutes:function(req, res) {
        db.Institute.findAll({
            include: [{association: 'Courses'}]
        })
        .then(function(result) {
            res.json(result)
        })
    },
    jsonUniversities:async function(req, res) {
        let universities = await db.University.findAll({
            include: [{association: 'Careers', include: [{association: 'Asignatures'}]}]
        })
        res.json(universities)
    },
    // --> /DATAENTRY <-- \\
    
    
    home: async function(req, res){

        let institutes = await db.Institute.findAll();
        let universities = await db.University.findAll();

        res.render('home', {institutes, universities});
    },
    meet: async function(req, res){
        let userStudies = await db.User.findAll({
            where: {rol: 2},//'2' debe ser reemplazado por el rol que corresponda a estudiantes
            include: [{association: 'User_careers'}, {association: 'User_courses'}]
        })
        .catch(error => {
            res.send(error)
        })
        
        let universityCareers = await db.Career.findAll({
            include: [{association: 'Universities'}]
        })
        .catch(error => {
            res.send(error)
        })
        let instituteCourses = await db.Course.findAll({
            include: [{association: 'Institutes'}]
        })
        .catch(error => {
            res.send(error)
        })
        
        let interests = await db.Interest.findAll().catch(error => {res.send(error)});
        let institutes = await db.Institute.findAll().catch(error => {res.send(error)});
        let courses = await db.Course.findAll().catch(error => {res.send(error)});
        let universities = await db.University.findAll().catch(error => {res.send(error)});
        let careers = await db.Career.findAll().catch(error => {res.send(error)});
        
        [careers, courses] = duplicateCleaner(careers, courses);

        res.render('meet', {userStudies, universityCareers, instituteCourses, interests, institutes, courses, universities, careers});
    },
    filterMeet: async (req, res) => {
        
        let userStudies = await db.User.findAll({
            where: {
                rol: 2
            },
            include: [
                {
                    model: db.Career,
                    as: 'User_careers',
                    through: {
                        model: db.User_career_study
                    }
                }, 
                {
                    model: db.Course,
                    as: 'User_courses',
                    through: {
                        model: db.User_course_study
                    }
                }
            ]
        })
        let usersFiltered = await usersFilter(userStudies, req.query);
        
        let users = await db.User_career_study.findAll();
        
        let universityCareers = await db.Career.findAll({
            include: [{association: 'Universities'}]
        })
        let instituteCourses = await db.Course.findAll({
            include: [{association: 'Institutes'}]
        })
        
        let interests = await db.Interest.findAll();
        let institutes = await db.Institute.findAll();
        let courses = await db.Course.findAll();
        let universities = await db.University.findAll();
        let careers = await db.Career.findAll();
        
        [careers, courses] = duplicateCleaner(careers, courses);

        res.render('meet', {userStudies:usersFiltered, universityCareers, instituteCourses, interests, institutes, courses, universities, careers});
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
    },
    comingSoon: function(req, res){
        res.render('comingSoon')
    }
};

