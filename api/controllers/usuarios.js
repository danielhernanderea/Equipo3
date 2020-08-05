'use strict'

var Usuarios = require('../models/usuarios')


function getUsuario(req,res) {
  console.log('GET usuarios  /Usuarios')
  let idusuario = req.params.idusuario
  Usuarios.find({id:idusuario}, (err, usuario) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de usuario ${err}`)

    if(!usuario) return res.status(404).send(`El usuario no existe ${idUsuario}`)

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
  usuario.password = req.body.password
  usuario.movimientos = req.body.movimientos

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
  saveUsuario,
  updateUsuario,
  deleteUsuario
}
