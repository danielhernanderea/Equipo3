'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var config = require('../config')

function createToken(usuario) {
  var payload = {
    sub: usuario.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
  //console.log("***en pinky promise")
  var decoded = new Promise((resolve, reject) => {
    try {
      var payload = jwt.decode(token, config.SECRET_TOKEN)

      if(payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      resolve(payload.sub)
    }catch(err){
      reject({
        status: 500,
        message: 'Token no válido'
      })
    }
  })

  return decoded

}

module.exports = {
  createToken,
  decodeToken
}
