const express = require('express');
const app = express();
const Departamento = require('./database/Departamento');
const Funcionario = require('./database/Funcionario');
const bodyParser = require('body-parser');
const connection = require('./database/database');

///////////////////usando bodyParser para pegar os dados.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//////////////////////////////
app.use(express.static('public'));
//////////////////////////////


connection.authenticate()// trying to connect
    .then(() => {
        console.log('database is connected');
    }).catch((avisoErro) => {
        console.log(avisoErro)
    });

//ROUTES
app.set('view engine', 'ejs');//SETANDO PARA O FRONT.

app.get('/', (req, res) => { res.render('index'); });

app.get('/cadastrar', (req, res) => { res.render('cadastrar')});

app.get('/listar', (req, res)=>{ res.render('listaCadastrados');});

app.get('/listasFunc', (req, res)=>{
    Funcionario.findAll(
        {raw:true},//fazendo uma ligacao com o Departamento
        )
    .then(valoresFunc=>{
        console.log(valoresFunc)
        return res.json(valoresFunc);
    });
})

app.post('/cadastro', (req, res) => {//Salvando no Banco
    var nome_func = req.body.inNome;
    var cpf_func = req.body.inCpf;
    var tel_func = req.body.inTel;
    var email_func = req.body.inEmail;
    var nome_depar = req.body.inDepar;

    Departamento
        .create({
            nome_depar: nome_depar
        });
    Funcionario
        .create({
            nome_func: nome_func,
            cpf_func: cpf_func,
            tel_func: tel_func,
            email_func: email_func
        }).then(()=>{
            res.redirect('/');
        })
});

app.listen(8888, (req, res) => {//criando uma função args para verificar se o servidor express está funcionando
    console.log('server running')
});