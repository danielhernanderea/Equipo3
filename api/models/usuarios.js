'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs')
var crupto = require('crypto')

var UsuarioSchema = Schema({
  id: Number,
  nombre: String,
  apellidop: String,
  apellidom: String,
  email: String,
  password: String,
  saldo: Number
})

UsuarioSchema.pre('save', (next) =>{
  var usuario = this
//  if(!usuario.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next()
    bcrypt.hash(usuario.password, salt, null, (err, hash) => {
      if(err) return next(err)
      usuario.password = hash
      next()
    })
  })
})

UsuarioSchema.methods.gravatar = function() {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro'`
}

module.exports = mongoose.model('Usuarios', UsuarioSchema)
