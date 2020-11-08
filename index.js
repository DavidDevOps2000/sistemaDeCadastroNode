const express = require('express');
const app = express();
const Departamento = require('./database/Departamento');
const Funcionario = require('./database/Funcionario');
const BodyParser = require('body-parser');
const connection = require('./database/database');

connection.authenticate()// trying to connect
.then(()=>{
    console.log('database is connected');
}).catch((avisoErro)=>{
    console.log(avisoErro)
});


app.set('view engine', 'ejs');//SETANDO PARA O FRONT.

app.use(express.static('public'));//indicando ao express a pasta dos arquivos estáticos.

app.get('/', (req, res)=>{//pagina inicial já roteando para cadastro.
    res.render('index');
});

app.listen(8888, (req, res)=>{//criando uma função args para verificar se o servidor express está funcionando
    console.log('server running')
});