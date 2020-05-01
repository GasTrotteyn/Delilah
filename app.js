const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRoutes = require('./rutes/usuariosRoutes');
const adminRoutes = require('./rutes/adminRoutes');

app.use(cors({ origin: '*' }), bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/usuarios', usuariosRoutes);
//app.use('/admin', adminRoutes);

module.exports = app;