const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('./config/cors')
require('./connection/MongoDB') /** INSTANCIA DA CONEXÃO */
app.use(express.json())

const routes = require('./routes/routes')
// const produto = require('./routes/ProdutoRoutes')

app.use(morgan('dev')) // Monitora as requisições http
app.use(bodyParser.urlencoded({ extended: false })) // apenas dados simples
app.use(bodyParser.json())
app.use(cors)

app.use(routes)

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app

// npm i nodemon -D
// npm i --save express
// npm i --save body-parser
// npm i --save morgan
// npm i --save mongodb
// npm i --save mongoose