'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsuarioSchema = Schema({
  nombre: String,
  apellidop: String,
  apellidom: String,
  password: String,
  movimientos: String
})

module.exports = mongoose.model('Usuarios', UsuarioSchema)  //Checar este


/*"nombre": "nadia",
    "apellidop": "buendia",
    "apellidom": "silva",
    "password": "1234",
    "Movimientos": [{
        "comercio": "Walmart",
        "cantidad": {
            "$numberInt": "290"
        }
    }, {
        "comercio": "Sams",
        "cantidad": {
            "$numberInt": "750"
        }
    }, {
        "comercio": "Sephora",
        "cantidad": {
            "$numberInt": "2500"
        }
    }]*/
