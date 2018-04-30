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
    io.emit('firstPlayerClient', data)
  })
  socket.on('secondPlayerInput', function(data){
    io.emit('secondPlayerClient', data)
  })
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

//wildcare route, when front end is refreshed, this defaults it to that page
//try the app without this route and refresh your page, see what happens
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Starting our express server
server.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
