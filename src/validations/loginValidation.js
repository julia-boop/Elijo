const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs')

module.exports = [ 
    check('email')
        .not()
        .isEmpty()
        .withMessage('Credenciales inválidas'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Credenciales inválidas'),
    body('email')
        .custom(function(loginEmail){
            let emailSearch = db.User.findOne({
                where:{
                    email: loginEmail
                }
            })
            .then(function(foundEmail){
                if(foundEmail){
                    return true
                } else {
                    throw Error('Credenciales inválidas')
                }
            })
            return emailSearch
        }),
    body('password')
        .custom(function(loginPassword, {req}){
            let emailSearch = db.User.findOne({
                where:{
                    email: req.body.email
                }
            })
            .then(function(result){
                if(bcrypt.compareSync(loginPassword, result.password)){
                    return true
                } else {
                    return Error('Credenciales inválidas')
                }
            })
        })
]