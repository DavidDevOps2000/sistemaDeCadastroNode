const Sequelize = require('sequelize');
const connection = require('./database');

const Funcionario = connection.define('depar',{
    nome_depar:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

modules.exports = Funcionario;