const jwt = require('jsonwebtoken');
const firma = require('../config/firma.json')


function datosCompletosRegistro(req, res, next) {
    let datos = req.body;
    if (datos.usuario && datos.password && datos.mail && datos.nombre && datos.apellido && datos.telefono && datos.direccion) {
        next();
    } else {
        res.status(400).send('faltan datos, llenar todos los campos')
    }
}
function datosCompletosLogin(req, res, next) {
    let datos = req.body;
    if ((datos.usuario || datos.mail) && datos.password) {
        next();
    } else {
        res.status(400).send('faltan datos, llenar todos los campos')
    }
}

function estaLogueado(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try{
        const decodificado = jwt.verify(token, firma);
        if (decodificado) {
            req.usuario = decodificado.usuario;
            req.idRol = decodificado.idRol;
            req.id = decodificado.id;
            next();
        } else {
            res.status(401).send('login inválido')
        }
    }
    catch(error){
        res.status(401).send('login inválido')
    }
}

module.exports = {
    estaLogueado,
    datosCompletosRegistro,
    datosCompletosLogin,
    estaLogueado
}