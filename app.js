'use strict'

var express = require('express')
var bodyparser = require('body-parser')
var app = express()
var usuarioControllers = require('./api/controllers/usuarios')
var movimientosControllers = require('./api/controllers/movimientos')
var criptomonedasControllers = require('./api/controllers/criptomonedas')
var authControllers = require('./api/controllers/auth')
var auth = require('./middleware/auth')
var hbs = require('express-handlebars')

app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept")
  next()
})
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get('/Usuarios/:idusuario', usuarioControllers.getUsuario )

app.get('/Usuarios', usuarioControllers.getUsuarios)

app.post('/Usuarios', usuarioControllers.saveUsuario)

app.delete('/Usuarios/:idusuario', usuarioControllers.deleteUsuario)

app.put('/Usuarios', usuarioControllers.updateUsuario)

app.get('/Movimientos/:idusuario', movimientosControllers.getMovimiento)

//app.get('/Movimientos/', movimientosControllers.getMovimientos)

app.post('/Movimientos', movimientosControllers.saveMovimiento)

app.post('/Movimientos', movimientosControllers.saveMovimiento)

app.get('/Criptomonedas/', criptomonedasControllers.getCriptomoneda)

app.get('/Criptomonedas/:idcripto', criptomonedasControllers.getIdCripto)

app.get('/Api', criptomonedasControllers.consultaApi)

app.post('/Registro', authControllers.singUp)
app.post('/signin', authControllers.signIn)

app.get('/private', auth, (req, res) => {
  console.log("/private")
   //res.status(200).send(`Acceso Ok`)
   console.log({auth})
   res.status(200).send({message: 'Acceso ok'})
   console.log("Acceso oks")
})

app.get('/Login', (req, res)=>{
  res.render('login')
})

module.exports = app
