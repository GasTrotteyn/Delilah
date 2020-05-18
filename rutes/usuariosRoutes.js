const express = require('express');
const usuariosControllers = require('../controllers/usuariosControllers');
const usuariosMiddlewares = require('../middlewares/usuariosMiddlewares');
const api2 = express.Router();

api2.post('/usuario', usuariosMiddlewares.datosCompletosRegistro, usuariosControllers.postUsuario);
api2.post('/login', usuariosMiddlewares.datosCompletosLogin, usuariosControllers.login);
api2.patch('/desactivar', usuariosMiddlewares.estaLogueado, usuariosControllers.darDeBajaUsuario);
api2.get('/productos', usuariosMiddlewares.estaLogueado, usuariosControllers.getProductos);
api2.post('/pedido', usuariosMiddlewares.estaLogueado, usuariosMiddlewares.datosComlpetosPedido, usuariosControllers.postPedido);
api2.patch('/pedido/cancelar/:id', usuariosMiddlewares.estaLogueado, usuariosControllers.cancelarPedido);
api2.get('/productos/favoritos', usuariosMiddlewares.estaLogueado, usuariosControllers.getFavoritos)



module.exports = api2;
