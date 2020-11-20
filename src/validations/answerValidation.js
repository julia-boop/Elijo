const {check, validationResult, body} = require('express-validator');

module.exports = [
    check('question')
    .not()
    .isEmpty()
    .withMessage('No seleccionaste ninguna pregunta'),
    check('answer')
    .not()
    .isEmpty()
    .withMessage('Debes escribir una respuesta')
]