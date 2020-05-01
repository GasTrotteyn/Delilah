const server = require('./app.js');
const port = 3000
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://sql10335514:jzlge6xKAy@sql10.freemysqlhosting.net:3306/sql10335514');

sequelize.authenticate().then(async()=>console.log('authenticated connection with database'));

server.listen(port, ()=> console.log(`Server listen at port ${port}`))