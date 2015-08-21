var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Status = require('./status.js');
var activate = require('./activate');

app.get('/', function(req, res){
  res.send('index.html');
});
var connected = false;

var namespace = io.of('/namespace');
namespace.on('connection', function(socket){
  console.log('a user connected');

  var status = new Status();

  if (!connected) {
    connected = true;
    status.emit('subscribe');
  }

  status.on('data', function(data) {
    socket.emit('news', {
      status: data
    })
  });

  socket.on('subscribe', function () {
    if (!connected) {
      connected = true;
      status.emit('subscribe');
    }
  });

  socket.on('activate', function (data) {
    activate.events.emit('activate', data);
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