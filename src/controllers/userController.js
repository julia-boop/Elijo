const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const bcrypt = require('bcryptjs')

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

        let newUser = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            name: req.body.nombre,
            last_name: req.body.apellido,
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