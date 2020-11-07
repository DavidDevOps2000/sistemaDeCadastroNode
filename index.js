const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{

    res.render('index');

})

app.listen(8585, (req, res)=>{//criando uma função args para verificar se o servidor express está funcionando
    console.log('server running')
});