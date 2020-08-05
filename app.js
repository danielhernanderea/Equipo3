'use strict'

var express = require('express')
var bodyparser = require('body-parser')
var app = express()
var usuarioControllers = require('./api/controllers/usuarios')
var movimientosControllers = require('./api/controllers/movimientos')
var criptomonedasControllers = require('./api/controllers/criptomonedas')


app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept")
  next()
})

app.get('/Usuarios/:idusuario', usuarioControllers.getUsuario )

app.get('/Usuarios/', usuarioControllers.getUsuarios)

app.post('/Usuarios', usuarioControllers.saveUsuario)

app.delete('/Usuarios/:idusuario', usuarioControllers.deleteUsuario)

app.put('/Usuarios', usuarioControllers.updateUsuario)

app.get('/Movimientos/:idusuario', movimientosControllers.getMovimiento)

app.get('/Movimientos/', movimientosControllers.getMovimientos)

app.post('/Movimientos/', movimientosControllers.saveMovimiento)

app.get('/Criptomonedas/', criptomonedasControllers.getCriptomoneda)

app.get('/Criptomonedas/:idcripto', criptomonedasControllers.getIdCripto)

module.exports = app
