const Sequelize = require('sequelize');
const connection = require('./database');

const Departamento = connection.define('tbl_depar',{
    nome_depar:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

//Departamento.sync({force:true}).then(()=>{console.log('tabela Departamento Criada')});//atualizando as tabela juntamente com o sync de departamento

module.exports = Departamento;