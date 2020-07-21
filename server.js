//version inicial

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var Schema = mongoose.Schema;

var Usuarios = require('./models/usuarios')
//mongodb+srv://admin:<password>@cluster0.9xlde.mongodb.net/<dbname>?retryWrites=true&w=majority
//Potl3XLjLCgno7s9

mongoose.connect('mongodb+srv://admin:Potl3XLjLCgno7s9@cluster0.9xlde.mongodb.net/danadbank?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexión a MongoDB OK !");
});

var port = process.env.PORT || 3000;
var path = require('path');

var requestjson = require('request-json');

app.listen(port);
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept")
  next()
})

console.log('todo list RESTful API server started on: ' + port);


app.post('/Usuarios', function(req, res)  {
  console.log('POST /Usuarios')
  console.log(req.body)
  let usuario = new Usuarios()
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

})

app.get('/Usuarios/:idUsuario', function(req, res) {
  let idUsuario = req.params.idUsuario
  Usuarios.findById(idUsuario, (err, usuario) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de usuario ${err}`)

    if(!usuario) return res.status(404).send(`El usuario no existe ${idUsuario}`)

    res.status(200).send({usuario})
  })
})

app.get('/Usuarios/', function(req, res) {
  Usuarios.find({}, (err, usuario) => {
    if(err) return res.status(500).send(`Error al realizar la búsqueda de usuarios ${err}`)

    if(!Usuarios) return res.status(404).send(`No existen usuarios`)

    res.status(200).send({usuario})
  })
})



/*app.get('/Clientes', function(req, res) {

  clienteMLab.get('', function(err, resM, body) {
    if (err) {
      console.log(body)
    } else {
      res.send(body);
    }
  })
})

/*app.post('/Clientes', function(req, res) {
  clienteMLab.post('', req.body, function(err, resM, body) {
    res.send(body)
  })
})*/
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
