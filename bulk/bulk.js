const urldb = require("../config/urldb.json")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(urldb);
const fs = require('fs');

function cargarProductosDesdeCSV(file) {
    fs.readFile(file, 'utf8', async function (err, data) {
        var dataArray = data.split(/\r?\n/);
        dataArray.forEach(element => {
            let registro = element.split("|");
            console.log(registro);
            sequelize.query(`INSERT INTO productos (nombre, precioUnitario, urlFoto, disponible) 
            VALUES ('${registro[0]}', ${registro[1]}, '${registro[2]}', ${registro[3]} )`,
            ).then((respuesta) => {
                console.log(respuesta);
            }).catch((err) => {
                console.log(err);
            })
        });
    })
}

function cargarUsuariosDesdeCSV(file) {
    fs.readFile(file, 'utf8', async function (err, data) {
        var dataArray = data.split(/\r?\n/);
        dataArray.forEach(element => {
            let registro = element.split("|");
            console.log(registro);
            sequelize.query(`INSERT INTO usuarios (idRol, usuario, password, mail, nombre, apellido, telefono, direccion) 
            VALUES (${registro[0]},'${registro[1]}','${registro[2]}','${registro[3]}','${registro[4]}','${registro[5]}','${registro[6]}','${registro[7]}')`,
            ).then((respuesta) => {
                console.log(respuesta);
            }).catch((err) => {
                console.log(err);
            })
        });
    })
}
//cargarProductosDesdeCSV('productos7.csv');
//cargarUsuariosDesdeCSV('usuarios.csv');





