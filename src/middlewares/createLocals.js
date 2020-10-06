const db = require('../database/models');

async function createLocals(req, res, next) {
    if(req.session.userSession != undefined) {
        let usuario = await db.User.findByPk(req.session.userSession)
        .then(function(response) {
            res.locals.userLoggedIn = {
                id: response.id,
                rol: response.rol
            }
        })
        .catch(function(error) {
            res.json(error)
        })
    }
    next()
}

module.exports = createLocals;