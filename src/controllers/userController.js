const fs = require('fs');
const path = require('path');   

module.exports = {
    account: function(req, res){
        res.render('account');
    },
    register: function(req, res) {
        res.render('register');
    }
};