const urldb = require("../config/urldb.json")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(urldb);
const jwt = require('jsonwebtoken');
const firma = require("../config/firma.json");


function getProductos(req, res) {
    sequelize.query(`SELECT * FROM productos WHERE disponible=1`,
    {type: sequelize.QueryTypes.SELECT})
        //// FALTA CALCULAR FAVORITOS ////////////////////
        .then((respuesta) => {
            res.status(200).json(respuesta);
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
    usuarioDeBaja = req.id;
    sequelize.query(`UPDATE usuarios SET idRol=5 WHERE id=${usuarioDeBaja}`)
        .then((respuesta) => {
            res.status(200).send('usuario desactivado con éxito')
        }).catch((error) => {
            console.log('salió por el cath del controller ' + error);
            res.status(500).send();
        })
}

function login(req, res) {
    const entrante = req.body;
    sequelize.query(`SELECT * FROM usuarios WHERE usuario=? OR mail=?`,
        {
            replacements: [entrante.usuario, entrante.mail],
            type: sequelize.QueryTypes.SELECT
        })
        .then((encontrado) => {
            if (encontrado[0].idRol === 5){
                res.status(401).send('usuario inactivo')
            }
            else if (encontrado[0].password === entrante.password) {
                let contenido = { id: encontrado[0].id, idRol: encontrado[0].idRol };
                let token = jwt.sign(contenido, firma, { expiresIn: '2 hours' });
                let respuesta = { token: token }
                res.status(200).json(respuesta);
            } else {
                res.status(401).send('password incorrecta')
            };
        }).catch((error) => {
            console.log('salió por el cath del controller ' + error);
            res.status(404).send('Mail, usuario o password incorrectos.');
        });
}


module.exports = {
    getProductos,
    postUsuario,
    darDeBajaUsuario,
    login
}