const mongoose = require('mongoose')

const URL = 'mongodb://127.0.0.1/meubanco'

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports = mongoose