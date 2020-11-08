const Sequelize = require('sequelize');
const connection = require('./database');
const Departamento = require('./Departamento');//importando model para fazer a ligação 

const Funcionario = connection.define('func',{
    id:{
        type:Sequelize.INTEGER,
        primaKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nome_func:{
        type:Sequelize.STRING,
        allowNull: false
    },
    cpf_func:{
        type:Sequelize.STRING,//o tratamento das strings sera feito na entrada de dados
        allowNull:false
    },
    tel_func:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
Departamento.hasMany(Funcionario);//tbl_depar tem muitos funcionarios
Funcionario.belongTo(Departamento);// tbl_func pertence à tbl_depar ou seja de 1:1

//Funcionario.sync({force:true});//syncronizando e fazendo update

modules.exports = Funcionario;