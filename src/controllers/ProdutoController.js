const produto = require('../model/Produto')

module.exports = {
  async index(req, res) {
    await produto.find().exec()
      .then(produto => {
        if (produto) {
          const response = produto.map(p => {
            return {
              _id: p._id,
              descricao: p.descricao,
              valor: p.valor,
              ativo: p.ativo
            }
          })
          return res.status(200).send({
            quantidade: response.length, produto: response
          })
        }
      }, err => {
        console.log(err.message)
        return res.status(404).send({ response: 'Não foi encontrado nenhum dado' })
      })
  },

  async findId(req, res) {
    const { id } = req.params
    await produto.findById(id).exec()
      .then(produto => {
        if (produto === null) return res.status(404).send({ response: 'Não encontrado' })

        return res.status(200).send(produto)
      }, err => {
        console.log(err.message)
        return res.status(500).send({ response: err.message })
      })
  },

  async create(req, res) {
    const { descricao, valor, ativo } = req.body
    if (!descricao || !valor || !ativo) return res.status(403).send({
      response: 'Campos inválidos!',
      required: {
        body: {
          descricao: 'String',
          valor: 'Number',
          ativo: 'Boolean'
        }
      }
    })

    const body = { descricao, valor, ativo }

    await produto.create(body).then(produto => {
      return res.status(201).send(produto)
    }).catch(err => {
      console.log(err.message)
      return res.status(500).send(err.message)
    })
  },

  async delete(req, res) {
    const { id } = req.params
    await produto.deleteOne({ '_id': id }).exec()
      .then(produto => {
        if (produto.n == 0) return res.status(404).send({ response: 'Não encontrado' })
        return res.status(200).send({ response: 'Apagado com sucesso' })
      }, err => res.status(500).send({ response: 'Não encontrado' }))
  },

  async update(req, res) {
    const { descricao, valor, ativo, id } = req.body
    if (!descricao || !valor || !ativo || !id) return res.status(403).send({
      response: 'Campos inválidos!',
      required: {
        body: {
          id: 'ObjectID',
          descricao: 'String',
          valor: 'Number',
          ativo: 'Boolean'
        }
      }
    })

    const body = { descricao, valor, ativo, id }

    await produto.findById(id).exec()
      .then(produto => { }, err => {
        console.log(err.message)
        return res.status(404).send({ response: 'Não encontrado' })
      })

    await produto.findByIdAndUpdate(id, body)
      .then(produto => {
        console.log(produto)
        return res.status(200).send(produto)
      }, err => {
        return res.status(500).send({ response: 'Não alterado' })
      })
  },
}