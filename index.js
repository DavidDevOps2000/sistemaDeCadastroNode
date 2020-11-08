const express = require('express');
const app = express();

app.set('view engine', 'ejs');//SETANDO PARA O FRONT.

app.use(express.static('public'));//indicando ao express a pasta dos arquivos estáticos.

app.get('/', (req, res)=>{//pagina inicial já roteando para cadastro.
    res.render('index');
});

app.listen(8585, (req, res)=>{//criando uma função args para verificar se o servidor express está funcionando
    console.log('server running')
});