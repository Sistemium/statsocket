var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Status = require('./status.js').Status;
var Activate = require('./activate');

app.get('/', function(req, res){
  res.send('index.html');
});

var statusNS = io.of('/status');
var status = new Status(socket);

statusNS.on('connection', function(socket){
  console.log('a user connected');

  if (!connected) {
    connected = true;
    status.emit('subscribe');
  }

  socket.on('subscribe', function () {
    if (!connected) {
      connected = true;
      status.emit('subscribe');
    }
  });

  socket.on('activate', function (data) {
    var activate = new Activate();
    activate.emit('activate', data);
  });

  socket.on('disconnect', function () {
    if (io.sockets.sockets.length === 0) {
      var status = new Status();
      status.emit('unsubscribe');
      connected = false;
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
