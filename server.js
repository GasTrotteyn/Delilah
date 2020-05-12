const urldb = require ("./config/urldb")
const server = require('./app.js');
const port = 3001
const Sequelize = require('sequelize');
const sequelize = new Sequelize(urldb);

sequelize.authenticate().then(async()=>console.log('authenticated connection with database'));

server.listen(port, ()=> console.log(`Server listen at port ${port}`))