const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const bcrypt = require('bcryptjs')

module.exports = {
    account: function(req, res){
        res.render('account');
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
            postal_code: null, 
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
    }
};