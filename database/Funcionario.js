const Sequelize = require('sequelize');
const connection = require('./database');
const Departamento = require('./Departamento');//importando model para fazer a ligação 

const Funcionario = connection.define('tbl_func',{
    nome_func:{
        type:Sequelize.STRING,
        allowNull: false
    },
    cpf_func:{
        type:Sequelize.STRING,//o tratamento das strings sera feito na entrada de dados
        allowNull:false,
        unique: true,
    },
    tel_func:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email_func:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
//Departamento.hasMany(Funcionario);//tbl_depar tem muitos funcionarios
//Funcionario.belongsTo(Departamento);// tbl_func pertence à tbl_depar ou seja de 1:

//Funcionario.sync({force:true}).then(()=>{console.log('tabela funcionario criada')});//syncronizando e fazendo update

module.exports = Funcionario;