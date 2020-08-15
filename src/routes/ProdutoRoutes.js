const { Router } = require('express')
const ProdutoController = require('../controllers/ProdutoController')
const routes = Router()

routes.get('/', ProdutoController.index)
routes.get('/:id', ProdutoController.findId)
routes.post('/', ProdutoController.create)
routes.delete('/:id', ProdutoController.delete)
routes.put('/', ProdutoController.update)

module.exports = routes