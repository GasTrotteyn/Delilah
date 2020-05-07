const express = require('express');
const adminControllers = require('../controllers/adminControllers');
const adminMiddlewares = require('../middlewares/adminMiddlewares');
const api = express.Router();

api.post('/productos', adminMiddlewares.esAdmin, adminControllers.postProducto);
api.put('/productos/:id', adminMiddlewares.esAdmin, adminControllers.putProducto);
api.delete('/productos/:id', adminMiddlewares.esAdmin, adminControllers.deleteProducto);
api.get('/clientes', adminMiddlewares.esAdmin, adminControllers.getClientes);



module.exports = api;