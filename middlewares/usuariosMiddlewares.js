const jwt = require("jsonwebtoken");
const firma = require("../conf/firma.json");

function datosCompletosRegistro(req, res, next) {
    let { usuario, password, mail, nombre, apellido, telefono, direccion } =
        req.body;
    if (
        usuario &&
        password &&
        mail &&
        nombre &&
        apellido &&
        telefono &&
        direccion
    ) {
        next();
    } else {
        res.status(400).send("faltan datos, llenar todos los campos");
    }
}
function datosCompletosLogin(req, res, next) {
    let { usuario, mail, password } = req.body;
    if ((usuario || mail) && password) {
        next();
    } else {
        res.status(400).send("faltan datos, llenar todos los campos");
    }
}

function estaLogueado(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodificado = jwt.verify(token, firma);
        if (decodificado) {
            req.idRol = decodificado.idRol;
            req.id = decodificado.id;
            next();
        } else {
            res.status(401).send("login inválido");
        }
    } catch (error) {
        res.status(401).send("login inválido");
    }
}

function datosComlpetosPedido(req, res, next) {
    let { detalles, idFormaDePago } = req.body;
    if (detalles && idFormaDePago) {
        next();
    } else {
        res.status(400).send("faltan datos, llenar todos los campos");
    }
}

module.exports = {
    estaLogueado,
    datosCompletosRegistro,
    datosCompletosLogin,
    estaLogueado,
    datosComlpetosPedido,
};
