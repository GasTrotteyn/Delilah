const express = require('express');
const usuariosControllers = require('../controllers/usuariosControllers');
const usuariosMiddlewares = require('../middlewares/usuariosMiddlewares');
const api2 = express.Router();

api2.get('/productos', usuariosMiddlewares.estaLogueado, usuariosControllers.getProductos);
api2.post('/', usuariosControllers.postUsuario);
api2.patch('/desactivar/:id', usuariosControllers.darDeBajaUsuario);
api2.post('/login', /*crear middletraiga datos*/ usuariosControllers.login)



module.exports = api2;
