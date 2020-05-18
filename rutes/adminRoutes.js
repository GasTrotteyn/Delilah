const express = require('express');
const adminControllers = require('../controllers/adminControllers');
const adminMiddlewares = require('../middlewares/adminMiddlewares');
const api = express.Router();

api.get('/productos', adminMiddlewares.esAdmin, adminControllers.getTodosProductos);
api.get('/clientes', adminMiddlewares.esAdmin, adminControllers.getClientes);
api.get('/empleados', adminMiddlewares.esAdmin, adminControllers.getEmpleados);
api.post('/productos', adminMiddlewares.esAdmin, adminControllers.postProducto);
api.put('/productos/:id', adminMiddlewares.esAdmin, adminControllers.putProducto);
api.delete('/productos/:id', adminMiddlewares.esAdmin, adminControllers.deleteProducto);
api.patch('/empleados', adminMiddlewares.esDueño, adminMiddlewares.datosCompletosHacerAdmin, adminControllers.hacerAdmin)
api.get('/pedidos', adminMiddlewares.esAdmin, adminControllers.getPedidos)

module.exports = api;