const jwt = require('jsonwebtoken');


function esAdmin(req, res, next){
    next();
}

module.exports = {
    esAdmin
}