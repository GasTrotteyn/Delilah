const urldb = require("../conf/urldb.json");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(urldb);
const jwt = require("jsonwebtoken");
const firma = require("../conf/firma.json");
const moment = require("moment");

async function getProductos(req, res) {
    sequelize
        .query(`SELECT * FROM productos WHERE disponible=1`, {
            type: sequelize.QueryTypes.SELECT,
        })
        .then(async function (respuesta) {
            let favoritos = await getFavoritos(req.id);
            res.status(200).json({
                favoritos: favoritos,
                disponibles: respuesta,
            });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

function getFavoritos(idUsuario) {
    return new Promise(function (resolve, reject) {
        sequelize
            .query(
                `SELECT pr.nombre, pr.urlFoto, pr.precioUnitario
        FROM renglones r
        JOIN productos pr ON r.idProducto = pr.id
        JOIN pedidos pd ON r.idPedido = pd.id
        JOIN usuarios u ON pd.idUsuario = u.id WHERE u.id = ?
        ORDER BY pr.nombre ASC`,
                {
                    replacements: [idUsuario],
                }
            )
            .then((respuesta) => {
                let productos = respuesta[0];
                let agrupado = productos.reduce(function (acc, element) {
                    acc[element.nombre] = acc[element.nombre] + 1 || 1;
                    return acc;
                }, {});
                resolve(agrupado);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function postUsuario(req, res) {
    usuarioNuevo = req.body;
    usuarioNuevo.idRol = 1;
    sequelize
        .query(
            `INSERT INTO usuarios (idRol, usuario, password, mail, nombre, apellido, telefono, direccion) VALUES
    (:idRol, :usuario, :password, :mail, :nombre, :apellido, :telefono, :direccion)`,
            { replacements: usuarioNuevo }
        )
        .then((respuesta) => {
            res.status(201).send("usuario creado con éxito");
        })
        .catch((error) => {
            res.status(500).send("Usuario o mail no disponibles " + error);
        });
}

function darDeBajaUsuario(req, res) {
    usuarioDeBaja = req.id;
    sequelize
        .query(`UPDATE usuarios SET idRol=5 WHERE id=${usuarioDeBaja}`)
        .then((respuesta) => {
            res.status(200).send("usuario desactivado con éxito");
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

function login(req, res) {
    const entrante = req.body;
    sequelize
        .query(`SELECT * FROM usuarios WHERE usuario=? OR mail=?`, {
            replacements: [entrante.usuario, entrante.mail],
            type: sequelize.QueryTypes.SELECT,
        })
        .then((encontrado) => {
            if (encontrado[0].idRol === 5) {
                res.status(401).send("usuario inactivo");
            } else if (encontrado[0].password === entrante.password) {
                let contenido = {
                    id: encontrado[0].id,
                    idRol: encontrado[0].idRol,
                };
                let token = jwt.sign(contenido, firma, {
                    expiresIn: "2 hours",
                });
                let respuesta = { token: token };
                res.status(200).json(respuesta);
            } else {
                res.status(401).send("password incorrecta");
            }
        })
        .catch((error) => {
            res.status(404).send(
                "Mail, usuario o password incorrectos. " + error
            );
        });
}

function postPedido(req, res) {
    let hora = moment().format("YYYY-MM-DD HH:mm:ss");
    let { idFormaDePago, detalles } = req.body;
    sequelize
        .query(
            "INSERT INTO pedidos (idUsuario, idFormaDePago, idEstado, hora) VALUES (?,?,?,?)",
            { replacements: [req.id, idFormaDePago, 1, hora] }
        )
        .then((respuesta) => {
            let idPedido = respuesta[0];
            postRenglones(detalles, idPedido)
                .then((precioTotal) => {
                    sequelize.query(
                        `UPDATE pedidos SET precioTotal=${precioTotal} WHERE id = ${idPedido}`
                    );
                })
                .then((terminado) => {
                    res.status(201).json({ idPedido: idPedido });
                })
                .catch((error) => {
                    res.status(500).send(error);
                });
        });
}

function postRenglones(detalles, idPedido) {
    return new Promise(function (resolve, reject) {
        let precioTotal = 0;
        detalles.forEach((element) => {
            let { idProducto, cantidad } = element;
            calcularPrecioRenglon(idProducto, cantidad)
                .then((precioRenglon) => {
                    precioTotal = precioTotal + precioRenglon;
                    sequelize
                        .query(
                            "INSERT INTO renglones (idPedido, idProducto, cantidad, precioRenglon) VALUES (?,?,?,?)",
                            {
                                replacements: [
                                    idPedido,
                                    idProducto,
                                    cantidad,
                                    precioRenglon,
                                ],
                            }
                        )
                        .then((posteado) => {
                            resolve(precioTotal);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    });
}

function calcularPrecioRenglon(idProducto, cantidad) {
    return new Promise(function (resolve, reject) {
        sequelize
            .query(
                "SELECT precioUnitario FROM productos WHERE id = ? AND disponible =1",
                {
                    replacements: [idProducto],
                    type: sequelize.QueryTypes.SELECT,
                }
            )
            .then((respuesta) => {
                if (respuesta.length !== 0) {
                    precioRenglon = respuesta[0].precioUnitario * cantidad;
                    resolve(precioRenglon);
                } else {
                    reject("No hay precio unitario");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

function cancelarPedido(req, res) {
    let cancelado = req.params.id;
    sequelize
        .query("SELECT idEstado FROM pedidos WHERE id=?", {
            replacements: [cancelado],
            type: sequelize.QueryTypes.SELECT,
        })
        .then((respuesta) => {
            let estadoDelCancelado = respuesta[0].idEstado;
            if (estadoDelCancelado < 4) {
                sequelize
                    .query("UPDATE pedidos SET idEstado=5 WHERE id=?", {
                        replacements: [cancelado],
                    })
                    .then((resp) => {
                        let mensaje = {
                            horaCancelación: moment().format(
                                "YYYY-MM-DD HH:mm:ss"
                            ),
                            idPedido: cancelado,
                            idCancelador: req.id,
                            detalles: resp[0].info,
                        };
                        res.status(200).json(mensaje);
                    });
            } else {
                res.status(401).send(
                    "el pedido ya fue enviado, no se puede cancelar"
                );
            }
        })
        .catch((error) => {
            res.status(400).send(
                "el pedido que se desea cancelar no existe " + error
            );
        });
}

function getEstado(req, res) {
    let idPedido = req.params.idPedido;
    sequelize
        .query(
            `SELECT estados.descripcion
        FROM pedidos
        JOIN estados ON pedidos.idEstado = estados.id WHERE pedidos.id = ?`,
            {
                replacements: [idPedido],
                type: sequelize.QueryTypes.SELECT,
            }
        )
        .then((estado) => {
            if (estado.length !== 0) {
                res.status(200).json(estado[0]);
            } else {
                res.status(400).send(
                    "el pedido que se desea consultar no existe"
                );
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
}

module.exports = {
    getProductos,
    getFavoritos,
    postUsuario,
    darDeBajaUsuario,
    login,
    postPedido,
    cancelarPedido,
    getEstado,
};
