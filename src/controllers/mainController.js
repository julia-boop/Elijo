const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

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