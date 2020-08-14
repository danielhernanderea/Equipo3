'use strict'

var service = require('../service')

function isAuth(req, res, next) {
  if(!req.headers.authorization) { //headers
    return res.status(403).send({message: `El usuario no tiene autorizacion`})
  }

  var token = req.headers.authorization.split(" ")[1]

  service.decodeToken(token)
  .then(response => {
    req.usuario = response // Checar
    next()
  })
  .catch(response => {
    res.status(response.status)
  })
}

module.exports = isAuth
