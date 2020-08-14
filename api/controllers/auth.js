'use strict'

var Usuarios = require('../models/usuarios')
var service = require('../../service')
var bcrypt = require('bcrypt-nodejs')
//var auth = require('../models/auth')

function singUp (req, res) {
  console.log("funcion signup")
  var usuario = new Usuarios({
    id: req.body.idusuario,
    nombre: req.body.nombre,
    apellidop: req.body.apellidop,
    apellidom: req.body.apellidom,
    email: req.body.email,
    password: req.body.password
  })
  usuario.saldo=25000
      //console.log(req.body.email)
    //  console.log(Usuarios.find({email:req.body.email}))
//  Usuarios.find({email:req.body.email}, (err, usuario) => {

    bcrypt.genSalt(10,  (err, salt) => {
      if (err) {
        throw err
      } else {
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
          if (err) {
            throw err
          } else {
            usuario.password=hash
          }
        })
      }
    })

  //  if(usuario) {
      usuario.save((err) => {
        if(err) res.status(500).send(`Error al realizar la búsqueda de usuario ${err}`)
        return res.status(200).send({token: service.createToken(usuario)})
      })
    //}
    /*else {
    res.status(200).send({
      message: "El usuario ya existe",
      token: service.createToken(usuario)
    })
  }*/
//  })
}


function signIn (req, res) {
//  var usuario = new Usuarios
  Usuarios.find({email: req.body.email}, (err, usuario) => {
    if(err) return res.status(500).send({message: err})
    if(!usuario) return res.status(404).send({message: 'No existe el usuario'})

    req.usuario = usuario //checar
    res.status(200).send({
      message: "Login exitoso",
      token: service.createToken(usuario)
    })
  })
}

module.exports = {
  singUp,
  signIn
}
