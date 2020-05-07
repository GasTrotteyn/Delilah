const urldb = require("../config/urldb.json")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(urldb);

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
            res.status(201).send('producto creado')
        }).catch((error) => {
            res.status(500).send('no se pudo crear el producto ' + error)
        })
}

function putProducto(req, res) {
    let productoNuevo = req.body;
    let cambiado = req.params.id;
    sequelize.query(`UPDATE productos SET nombre=:nombre, precioUnitario=:precioUnitario, urlFoto=:urlFoto,
    disponible=:disponible WHERE id =${cambiado}`,
    { replacements: productoNuevo })
    .then((respuesta) => {
        res.status(201).send('producto modificado satisfactoriamente')
    }).catch((error) => {
        res.status(500).send('salió por el catch del controller')
    })
}

function deleteProducto(req, res) {
    let eliminado = req.params.id;
    sequelize.query(`DELETE FROM productos WHERE id=${eliminado}`)
    .then((respuesta) => {
        res.status(204).send('producto borrado')
    }).catch((error) => {
        res.status(500).send('salió por el catch del controller')
    })
}

function getClientes(req, res) {
    sequelize.query(`SELECT * FROM clientes`)
        .then((respuesta) => {
            console.log(respuesta[0]);
            res.status(200).json(respuesta[0]);
        }).catch((error) => {
            console.log('salió por el cath del controller');
            res.status(500).send();
        })
}

module.exports = {
    postProducto,
    putProducto,
    deleteProducto,
    getClientes
}