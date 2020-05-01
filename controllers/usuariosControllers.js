const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://sql10335514:jzlge6xKAy@sql10.freemysqlhosting.net:3306/sql10335514');
const jwt = require('jsonwebtoken');
const firma = require("../config/firma.json");

function getProductos(req, res) {
    sequelize.query(`SELECT * FROM productos`)
        //// FALTA CALCULAR FAVORITOS ////////////////////
        .then((respuesta) => {
            console.log(respuesta[0]);
            res.status(200).json(respuesta[0]);
        }).catch((error) => {
            console.log('salió por el cath del controller');
            res.status(500).send();
        })
}
function postUsuario(req, res) {
    usuarioNuevo = req.body;
    usuarioNuevo.idRol = 1;
    sequelize.query(`INSERT INTO usuarios (idRol, usuario, password, mail, nombre, apellido, telefono, direccion) VALUES
    (:idRol, :usuario, :password, :mail, :nombre, :apellido, :telefono, :direccion)`,
        { replacements: usuarioNuevo })
        .then((respuesta) => {
            res.status(201).send('usuario creado con éxito')
        }).catch((error) => {
            console.log('salió por el cath del controller ' + error);
            res.status(500).send('Usuario o mail no disponibles');
        })
}
function darDeBajaUsuario(req, res) {
    usuarioDeBaja = req.params.id;
    sequelize.query(`UPDATE usuarios SET idRol=5 WHERE id=${usuarioDeBaja}`)
        .then((respuesta) => {
            res.status(200).send('usuario desactivado con éxito')
        }).catch((error) => {
            console.log('salió por el cath del controller ' + error);
            res.status(500).send();
        })
}
async function login(req, res) {
    let entrante = req.body;
    sequelize.query(`SELECT * FROM usuarios WHERE usuario='${entrante.usuario}' OR mail='${entrante.mail}'`)
        .then((encontrado) => {
            if (encontrado[0][0].password === entrante.password) {
                let contenido = { usuario: encontrado.usuario, idRol: encontrado[0].idRol };
                let token = jwt.sign(contenido, firma);
                res.status(200).json(token);
            } else {
                res.status(404).send('usuario, mail o password incorrectos')
            };
        }).catch((error) => {
            console.log('salió por el cath del controller ' + error);
            res.status(500).send();
        });
}

module.exports = {
    getProductos,
    postUsuario,
    darDeBajaUsuario,
    login
}