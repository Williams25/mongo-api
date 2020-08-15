const mongoose = require('mongoose')

const Produto = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: false,
    min: [this.valor > 0]

  },
  ativo: {
    type: Boolean,
    required: false,
    default: function (v) {
      this.ativo = true
    }
  },
  created: {
    type: Date,
    default: Date.now,
    required: false
  }
})

module.exports = mongoose.model('Produto', Produto)