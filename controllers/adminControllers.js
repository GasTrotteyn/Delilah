const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://sql10335514:jzlge6xKAy@sql10.freemysqlhosting.net:3306/sql10335514');

function getClientes(req, res) {
    sequelize.query(`SELECT * FROM clientes`)
        .tehn((respuesta) => {
            console.log(respuesta);
            res.status(200).json(respuesta);
        }).catch((error) => {
            console.log('salió por el cath del controller');
            res.status(500).send();
        })
}

function postProducto(req, res) {
    let producto = req.body;
    sequelize.query(`INSERT INTO productos (nombre, precioUnitario, urlFoto, disponible) VALUES (:nombre, :precioUnitario, :urlFoto, :disponible)`,
        { replacements: producto })
        .then((respuesta) => {
            res.status(201).send('producto creado')
        }).catch((error) => {
            res.status(500).send('salió por el catch del controller')
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

module.exports = {
    getClientes,
    postProducto,
    putProducto,
    deleteProducto
}