const fs = require('fs');
const path = require('path');   

module.exports = {
    home: function(req, res){
        res.render('home');
    }
};