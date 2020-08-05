//version inicial

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config')
var path = require('path');
var requestjson = require('request-json');
var app = require('./app')
var Usuarios = require('./api/models/usuarios')
var Movimientos = require('./api/models/movimientos')
var Categorias = require('./api/models/criptomonedas')


mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexión a MongoDB OK !");
  app.listen(config.port, ()=>{
    console.log('RESTFul API server started on: http://localhost:' + config.port)
  })
}).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
})


/*
app.post('/Login', function(req, res) {
  res.set("Access-Control-Allow-Headers", "Content-Type")
  var email = req.body.email
  var password = req.body.password
  var query = 'q={"email":"'+ email +'","password":"' +password + '"}'
  console.log(query)
  var urlMLab = urlMlabRaiz + "/Usuarios?" + query + "&" + apiKey;
  console.log(urlMLab)
  clienteMlabRaiz = requestjson.createClient(urlMLab)
  clienteMlabRaiz.get('', function(err, resM, body) {
    if (!err) {
      if (body.length == 1) { //Login ok, se encontro 1 documento
        res.status(200).send('Usuario logado')
      } else { //No se encontro al usuario
        res.status(404).send('Usuario no encontrado')
      }
    }
  })
})


var userSchemaJSON = {
  email:String,
  password:String
};*/
