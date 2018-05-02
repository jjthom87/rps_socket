var express = require("express");
var bodyParser = require("body-parser");

var path = require("path");

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var PORT = process.env.PORT || 3000;

app.use(express.static("./public"));
io.on('connection', function (socket) {
  socket.on('firstPlayerInput', function(data){
    io.emit('firstPlayerClient', {data: data, id: socket.id});
  });
  socket.on('secondPlayerInput', function(data){
    io.emit('secondPlayerClient', {data: data, id: socket.id});
  });
  socket.on('playerOnePicked', function(data){
    io.emit('playerOnePickedClient', {data: data, id: socket.id});
  });
  socket.on('playerTwoPicked', function(data){
    io.emit('playerTwoPickedClient', {data: data, id: socket.id});
  });
  socket.on('playerOnePick', function(data){
    io.emit('playerOnePickClient', {data: data, id: socket.id});
  });
  socket.on('playerTwoPick', function(data){
    io.emit('playerTwoPickClient', {data: data, id: socket.id});
  });
  socket.on('playersPicked', function(data){
    io.emit('playersPickedClient', {data: data, id: socket.id});  
  });
  socket.on('playersPickedOneFirst', function(data){
    io.emit('playersPickedOneFirstClient', {data: data, id: socket.id});  
  });
  socket.on('playersPickedTwoFirst', function(data){
    io.emit('playersPickedTwoFirstClient', {data: data, id: socket.id});  
  });
  socket.on('disconnect', function(data){
    io.emit('playerDisconnected', socket.id);
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
