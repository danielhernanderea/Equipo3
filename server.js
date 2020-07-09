//version inicial

var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
var path = require('path');

var requestjson = require('request-json');
var urlClientes = "https://api.mlab.com/api/1/databases/nbuendia/collections/Clientes?apiKey=GOLqWa850qO8tsdCUdby6eq9eKPInBkt";
var clienteMLab = requestjson.createClient(urlClientes)

app.listen(port);
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept")
  next()
})

var movimientosJSON = require('./movimientosv2.json');

console.log('todo list RESTful API server started on: ' + port);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/', function(req, res) {
  res.send("Hemos recibido su petición post cambiada");
})

app.put('/', function(req, res) {
  res.send("Hemos recibido su petición put");
})

app.delete('/', function(req, res) {
  res.send("Hemos recibido su petición delete");
})

app.get('/Clientes/:idcliente', function(req, res) {
  res.send("Aquí tiene al cliente número " + req.params.idcliente);
})

app.get('/v1/Movimientos', function(req, res) {
  res.sendfile('movimientosv1.json');
})

app.get('/v2/Movimientos', function(req, res) {
  res.json(movimientosJSON);
})

app.get('/v2/Movimientos/:id', function(req, res) {
  console.log(req.params.id);
  res.send(movimientosJSON[req.params.id - 1]);
})

app.get('/v2/MovimientosQuery', function(req, res) {
  console.log(req.query);
  res.send("Se recibio el query");
})

app.post('/v2/Movimientos', function(req, res) {
  var nuevo = req.body
  nuevo.id = movimientosJSON.length + 1
  movimientosJSON.push(nuevo)
  res.send("Movimiento dado de alta")
})

app.get('/Clientes', function(req, res) {

  clienteMLab.get('', function(err, resM, body) {
    if (err) {
      console.log(body)
    } else {
      res.send(body);
    }
  })
})


app.post('/Clientes', function(req, res) {
  clienteMLab.post('', req.body, function(err, resM, body) {
    res.send(body)
  })
})
