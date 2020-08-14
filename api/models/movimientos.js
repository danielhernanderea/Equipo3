'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MovimientoSchema = Schema({
    id: Number,
    idusuario: Number,
    tipooperacion: String,
    descripcion: String,
    fecha: String,
    preciocompra: Number,
    idcripto: String,
    montogastado: Number,
    comision: Number

})



module.exports = mongoose.model('Movimientos', MovimientoSchema)  //Checar este
