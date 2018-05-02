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
    console.log('firstPlayerInput: ' + socket.id);
    io.emit('firstPlayerClient', {data: data, id: socket.id});
  });
  socket.on('secondPlayerInput', function(data){
    console.log('secondPlayerInput: ' + socket.id);
    io.emit('secondPlayerClient', {data: data, id: socket.id});
  });
  socket.on('playerOnePicked', function(data){
    console.log('playerOnePicked: ' + socket.id);
    io.emit('playerOnePickedClient', {data: data, id: socket.id});
  });
  socket.on('playerTwoPicked', function(data){
    console.log('playerTwoPicked: ' + socket.id);
    io.emit('playerTwoPickedClient', {data: data, id: socket.id});
  });
  socket.on('playerOnePick', function(data){
    console.log('playerOnePick: ' + socket.id);
    io.emit('playerOnePickClient', {data: data, id: socket.id});
  });
  socket.on('playerTwoPick', function(data){
    console.log('playerTwoPick: ' + socket.id);
    io.emit('playerTwoPickClient', {data: data, id: socket.id});
  });
  socket.on('playersPicked', function(data){
    console.log('playersPicked: ' + socket.id);
    io.emit('playersPickedClient', {data: data, id: socket.id});  
  });
  socket.on('playersPickedOneFirst', function(data){
    console.log('playersPickedOneFirst: ' + socket.id);
    io.emit('playersPickedOneFirstClient', {data: data, id: socket.id});  
  });
  socket.on('playersPickedTwoFirst', function(data){
    console.log('playersPickedTwoFirst: ' + socket.id);
    io.emit('playersPickedTwoFirstClient', {data: data, id: socket.id});  
  });
  socket.on('disconnect', function(data){
    console.log('disconnect: ' + socket.id);
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
