const jwt = require("jsonwebtoken");
const firma = require("../conf/firma.json");

function esAdmin(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodificado = jwt.verify(token, firma);
        if (decodificado.idRol > 1 && decodificado.idRol < 5) {
            req.idRol = decodificado.idRol;
            req.id = decodificado.id;
            next();
        } else {
            res.status(401).send("no tiene permiso para esta operación");
        }
    } catch (error) {
        res.status(401).send("login inválido");
    }
}

function esDueño(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodificado = jwt.verify(token, firma);
        if (decodificado.idRol === 4) {
            req.idRol = decodificado.idRol;
            req.id = decodificado.id;
            next();
        } else {
            res.status(401).send("no tiene permiso para esta operación");
        }
    } catch (error) {
        res.status(401).send("login inválido");
    }
}

function datosCompletosHacerAdmin(req, res, next) {
    let { id, idRol } = req.body;
    if (id && idRol <= 5) {
        next();
    } else {
        res.status(400).send("faltan datos, o alguno es inválido");
    }
}

module.exports = {
    esAdmin,
    esDueño,
    datosCompletosHacerAdmin,
};
