'use strict'

var Usuarios = require('../models/usuarios')
var bcrypt = require('bcrypt-nodejs')

function getUsuario(req,res) {
  console.log('GET usuarios  /Usuarios')
  let idusuario = req.params.idusuario
  Usuarios.find({id:idusuario}, (err, usuario) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de usuario ${err}`)

    if(!usuario) return res.status(404).send(`El usuario no existe ${idUsuario}`)

    res.status(200).send({usuario})
  })

}

function getEmail(req,res) {
  console.log('GET email  /Usuarios')
  let email = req.params.email
  Usuarios.find({email:email}, (err, usuario) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de usuario ${err}`)

    if(!usuario) return res.status(404).send(`El usuario no existe con email: ${email}`)

    res.status(200).send({usuario})
  })

}

function login(req,res) {
  console.log('GET login  /Usuarios')
  var email = req.params.email
  var password = req.params.password
  console.log(req.params.email)
  console.log(req.params.password)
  console.log(Usuarios.find({email:email,password:password}))
  Usuarios.find({email:email,password:password}, (err, usuario) => {
    if(err) return res.status(500).send(`Error al iniciar sesión ${err}`)

    if(!usuario) return res.status(404).send(`Usuario o password incorrectos`)

    res.status(200).send({usuario})
  })

}

function getUsuarios(req, res){
  console.log('GET usuario /Usuarios')
  Usuarios.find({}, (err, usuario) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de usuarios ${err}`)

    if(!Usuarios) return res.status(404).send(`No existen usuarios`)

    res.status(200).send({usuario})
  })
}

function saveUsuario(req, res){
  console.log('POST save /Usuarios')
  let usuario = new Usuarios()
  usuario.id=req.body.idusuario
  usuario.nombre = req.body.nombre
  usuario.apellidop = req.body.apellidop
  usuario.apellidom = req.body.apellidom
  usuario.email = req.body.email
  usuario.password = req.body.password
  usuario.movimientos = req.body.movimientos
  usuario.saldo = req.body.saldo


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

  console.log(' post hash')
  console.log(usuario.password)

  usuario.save((err, usuarioGuardado) => {
      if(err) res.status(500).send(`Error al guardar el usuario ${err}`)

      res.status(200).send({usuario:  usuarioGuardado})
      console.log('Usuario guardado' + usuarioGuardado)
  })
}

function updateUsuario(req, res){
  console.log('PUT update /Usuarios')
  let idUsuario = req.params.idUsuario
  let update = req.body

  usuario.findByIdAndUpdate(idUsuario, update, (err, usuarioActualizado) =>{
    if(err) rest.status(500).send(`Error al actualizar el usuario  ${err}`)

    rest.status(200).send({usuario:  usuarioActualizado})
    console.log('Usuario Actualizado' + usuarioActualizado)
  })
}
/*
function updateMontoUsuario(req, res){
  console.log('PUT update monto /Usuarios')
  let idUsuario = req.params.idUsuario
  let update = req.body
  let monto = req.montogastado

  let qusuario = { idusuario: 'idUsuario' };

  let query = {id:req.params.idUsuario}
  let saldo
  console.log("findone")
  Usuarios.findOne(query, (err, document) => {
    if(err) return res.status(500).send({message: err})
    if(document==null) return res.status(404).send({message: 'No existe el usuario'})
    if(document!=null) {
          res.status(200).send({status:200,message:"Saldo usuario",
          usuario:{saldo:document.saldo},
          token:service.createToken(document)});
    }
  })

  saldo = document.saldo - monto

  usuario.findOneAndUpdate(idUsuario, saldo, (err, montoActualizado) =>{
    if(err) rest.status(500).send(`Error al actualizar el saldo del usuario  ${err}`)

    rest.status(200).send({usuario:  montoActualizado})
    console.log('Monto usuario Actualizado' + montoActualizado)
  })
}
*/
function deleteUsuario(req, res){
  console.log('DELETE delete /Usuarios')
  let idUsuario = req.params.idUsuario

  usuario.findById(idUsuario, (err, usuario) => {
    if (err) res.status(500).send(`Error al borrar el usuario ${err}`)

    usuario.remove(err => {
      if (err) res.status(500).send(`Error al guardar el usuario ${err}`)
      res.status(200).send(`El usuario ha sido eliminado`)
    })
  })
}



module.exports = {
  getUsuario,
  getUsuarios,
  getEmail,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
  login
}
