const Sequelize = require('sequelize');

const connection  = new Sequelize('bd_sistema_cadastro','root','',
{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection; 