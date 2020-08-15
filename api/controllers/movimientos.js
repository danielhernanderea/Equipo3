'use strict'

var Movimientos = require('../models/movimientos')


function getMovimiento(req,res) {
  console.log('GET Movimientos por usuario /Movimientos')
  let idusuario = req.params.idusuario
  console.log(req.params.idusuario)
  Movimientos.find({idusuario:idusuario}, (err, movimiento) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de movimiento ${err}`)

    if(!movimiento) return res.status(404).send(`El movimiento no existe ${idMovimiento}`)

    res.status(200).send({movimiento})
  })

}

function getMovimientos(req, res){
  console.log('GET  /Movimientos')
  Movimientos.find({}, (err, movimiento) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de Movimientos ${err}`)

    if(!Movimientos) return res.status(404).send(`No existen Movimientos`)

    res.status(200).send({movimiento})
  })
}

function saveMovimiento(req, res){
  console.log('POST save /Movimientos')
  console.log(req.body)
  let movimiento = new Movimientos()
  movimiento.id = req.body.idmovimiento
  movimiento.idusuario = req.body.idusuario
  movimiento.tipooperacion = req.body.tipooperacion
  movimiento.descripcion = req.body.descripcion
  movimiento.fecha = req.body.fecha
  movimiento.preciocompra = req.body.preciocompra
  movimiento.idcripto = req.body.idcripto
  movimiento.montogastado = req.body.montogastado
  movimiento.comision = req.body.comision

  movimiento.save((err, movimientoGuardado) => {
      if(err) res.status(500).send(`Error al guardar el movimiento ${err}`)

      res.status(200).send({movimiento:  movimientoGuardado})
      console.log('movimiento guardado' + movimientoGuardado)
  })
}


function updateMovimiento(req, res){
  console.log('PUT update /Movimientos')
  let idMovimiento = req.params.idMovimiento
  let update = req.body

  movimiento.findByIdAndUpdate(idMovimiento, update, (err, movimientoActualizado) =>{
    if(err) rest.status(500).send(`Error al actualizar el movimiento  ${err}`)

    rest.status(200).send({movimiento:  movimientoActualizado})
    console.log('movimiento Actualizado' + movimientoActualizado)
  })
}

function deleteMovimiento(req, res){
  console.log('DELETE delete /Movimientos')
  let idMovimiento = req.params.idMovimiento

  movimiento.findById(idMovimiento, (err, movimiento) => {
    if (err) res.status(500).send(`Error al borrar el movimiento ${err}`)

    movimiento.remove(err => {
      if (err) res.status(500).send(`Error al guardar el movimiento ${err}`)
      res.status(200).send(`El movimiento ha sido eliminado`)
    })
  })
}


module.exports = {
  getMovimiento,
  getMovimientos,
  saveMovimiento,
  updateMovimiento,
  deleteMovimiento
}
