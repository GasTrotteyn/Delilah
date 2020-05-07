const urldb = require("../config/urldb.json")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(urldb);

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
            console.log(respuesta[0].affectedRows);
            if (respuesta[0].affectedRows !== 0) {
                res.status(201).send('producto modificado satisfactoriamente')
            } else {
                res.status(400).send('el producto no existe')
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

module.exports = {
    getTodosProductos,
    getClientes,
    getEmpleados,
    postProducto,
    putProducto,
    deleteProducto
}