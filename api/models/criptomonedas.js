'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CriptomonedasSchema = Schema({
  id: String,
  criptomoneda: String
})

module.exports = mongoose.model('criptomonedas', CriptomonedasSchema)  //Checar este


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
