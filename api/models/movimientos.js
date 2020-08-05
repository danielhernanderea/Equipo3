'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MovimientoSchema = Schema({
  id: Number,
  idusuario: Number,
  tipooperacion: String,
//  tipooperacion: {String, enum: ['Compra','Venta']},
  descripcion: String,
  fecha: String,
//  preciocompra: {Number, default: 0},
  //idcripto: {String, enum: ['BTC','ETC','XRP','LTC']},
  //montogastado:  {Number, default: 0},
  //comision:  {Double, default: 0.0}
  preciocompra: Number,
  idcripto: String,
  montogastado: Number,
  comision: Number
})


module.exports = mongoose.model('Movimientos', MovimientoSchema)  //Checar este
