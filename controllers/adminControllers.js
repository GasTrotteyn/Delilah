const urldb = require("../config/urldb.json")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(urldb);
const moment = require("moment");

function getTodosProductos(req, res) {
    sequelize.query(`SELECT * FROM productos`,
        { type: sequelize.QueryTypes.SELECT })
        .then((respuesta) => {
            res.status(200).json(respuesta);
        }).catch((error) => {
            res.status(500).send('algo salió mal: ' + error);
        })
}

function getClientes(req, res) {
    sequelize.query(`SELECT * FROM usuarios WHERE idRol = 1 OR idRol = 5`,
        { type: sequelize.QueryTypes.SELECT })
        .then((respuesta) => {
            res.status(200).json(respuesta);
        }).catch((error) => {
            res.status(500).send('salió por el cath del controller ' + error);
        })
}

function getEmpleados(req, res) {
    sequelize.query(`SELECT * FROM usuarios WHERE idRol >1 AND idRol<5 `,
        { type: sequelize.QueryTypes.SELECT })
        .then((respuesta) => {
            res.status(200).json(respuesta);
        }).catch((error) => {
            res.status(500).send('salió por el cath del controller ' + error);
        })
}

function postProducto(req, res) {
    let producto = req.body;
    sequelize.query(`INSERT INTO productos (nombre, precioUnitario, urlFoto, disponible) VALUES (?, ?, ?, ?)`,
        {
            replacements: [
                producto.nombre,
                producto.precioUnitario,
                producto.urlFoto,
                producto.disponible]
        })
        .then((respuesta) => {
            res.status(201).send('producto creado');
            console.log(respuesta)
        }).catch((error) => {
            res.status(400).send('no se pudo crear el producto ' + error)
        })
}

function putProducto(req, res) {
    let productoNuevo = req.body;
    productoNuevo.id = req.params.id;
    sequelize.query(`UPDATE productos SET nombre=:nombre, precioUnitario=:precioUnitario, urlFoto=:urlFoto,
    disponible=:disponible WHERE id =:id`,
        { replacements: productoNuevo })
        .then((respuesta) => {
            //console.log(respuesta[0].affectedRows);
            if (respuesta[0].affectedRows !== 0) {
                res.status(200).send('producto modificado satisfactoriamente')
            } else {
                res.status(400).send('el producto que se desea modificar no existe')
            }
        }).catch((error) => {
            res.status(400).send('no se pudo modificar el producto: ' + error)
        })
}

function deleteProducto(req, res) {
    let eliminado = req.params.id;
    sequelize.query(`DELETE FROM productos WHERE id=?`,
        { replacements: [eliminado] })
        .then((respuesta) => {
            if (respuesta[0].affectedRows !== 0) {
                res.status(204).send();
            } else {
                res.status(400).send('el producto que se desea eliminar no existe');
            }
        }).catch((error) => {
            res.status(500).send('salió por el catch del controller' + error);
        })
}

function hacerAdmin(req, res) {
    let nuevoAdmin = req.body;
    sequelize.query('UPDATE usuarios SET idRol=:idRol WHERE id=:id',
        { replacements: nuevoAdmin })
        .then((respuesta) => {
            //console.log(respuesta[0].affectedRows);
            if (respuesta[0].affectedRows !== 0) {
                res.status(202).send('usuario modificado satisfactoriamente')
            } else {
                res.status(400).send('el usuario que se desea modificar no existe')
            }
        }).catch((error) => {
            res.status(400).send('no se pudo modificar el usuario: ' + error)
        })
}

function getPedidos(req, res) {
    sequelize.query(`SELECT p.idEstado, e.descripcion AS estado, p.hora, p.id AS idPedido , pr.nombre AS producto, r.cantidad, 
    fp.descripcion AS formaDePago, p.precioTotal, u.nombre, u.apellido, u.direccion
    FROM pedidos p
    JOIN renglones r ON p.id = r.idPedido
    JOIN productos pr ON r.idProducto = pr.id
    JOIN usuarios u ON p.idUsuario = u.id
    JOIN estados e ON p.idEstado = e.id
    JOIN formasDePago fp ON p.idFormaDePago = fp.id
    ORDER BY idPedido DESC`
    ).then((respuesta) => {
        let pedidos = respuesta[0];
        let agrupado = pedidos.reduce(function (acc, element) {
            acc[element.idPedido] = acc[element.idPedido] || [];
            acc[element.idPedido].push(element);
            return acc;
        }, Object.create(null));
        res.status(200).json(agrupado);
    }).catch((error) => {
        res.status(500).send(error);
    })
}

function cambiarEstado(req, res) {
    let idPedido = parseInt(req.params.idPedido);
    let idEstado = req.body.idEstado;
    sequelize.query(
        `UPDATE pedidos SET idEstado = ? WHERE id = ?`,
        { replacements: [idEstado, idPedido] })
        .then((estado) => {
            console.log('lineas afectadas ' + estado[0].affectedRows);
            if (estado[0].affectedRows) {
                let mensaje = {
                    horaModificación: moment().format("YYYY-MM-DD HH:mm:ss"),
                    idPedido: idPedido,
                    idModificador: req.id,
                    detalles: estado[0].info
                }
                res.status(200).json(mensaje)

            } else {
                res.status(400).send('el pedido que se desea modificar no existe ó ya tiene el estado solicitado')
            }
        }).catch((error) => {
            res.status(401).send('el idEstado introducido no es válido ' + error)
        })
}

    module.exports = {
        getTodosProductos,
        getClientes,
        getEmpleados,
        postProducto,
        putProducto,
        deleteProducto,
        hacerAdmin,
        getPedidos,
        cambiarEstado
    }