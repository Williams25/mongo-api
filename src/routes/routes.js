const express = require('express')
const routes = express()
const produto = require('./ProdutoRoutes')

routes.use('/produtos', produto)

module.exports = routes
