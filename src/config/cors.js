const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // configurando cors
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).send({})
  }

  next()
}
module.exports = cors