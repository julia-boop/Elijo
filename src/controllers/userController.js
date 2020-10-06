const fs = require('fs');
const path = require('path');   
const db = require('../database/models');

module.exports = {
    account: async function(req, res){
        let universities = await db.University.findAll();
        let institutes = await db.Institute.findAll();
        //return res.send(universities);
        res.render('account', {universities, institutes});
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
    edit: (req, res) => {
        db.User.findByPk(1/*req.session.userSession*/)
        .then(user => {
            let userUpdated = {
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
                userUpdated.photo = req.files[0].filename;
            }
            db.User.update(userUpdated, {
                where: {
                    id: 1
                }
            })
            .then(userUpdated => {
                return res.redirect('/user/account/'+userUpdated.id);
            })
        })
        .catch(err => {
            return res.send(err);
        })
        
    }
};