const jwt = require('jsonwebtoken');


function estaLogueado(req, res, next){
    next();
}

module.exports = {
    estaLogueado
}