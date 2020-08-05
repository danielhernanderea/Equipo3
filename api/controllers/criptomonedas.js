'use strict'

var Criptomonedas = require('../models/criptomonedas')


function getIdCripto(req,res) {
  console.log('GET criptomonedas by id  /Criptomonedas/')
  let idcripto = req.params.idcripto
  Criptomonedas.find({id:idcripto}, (err, idcripto) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de criptomoneda ${err}`)

    if(!idcripto) return res.status(404).send(`La criptomoneda no existe ${idcripto}`)

    res.status(200).send({idcripto})
  })

}

function getCriptomoneda(req, res){
  console.log('GET criptomoneda /Criptomonedas')
  Criptomonedas.find({}, (err, criptomoneda) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de criptomonedas ${err}`)

    if(!Criptomonedas) return res.status(404).send(`No existen criptomonedas`)

    res.status(200).send({criptomoneda})
  })
}

module.exports = {
  getIdCripto,
  getCriptomoneda
}
