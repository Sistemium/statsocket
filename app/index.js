var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Status = require('./status.js');
var Activate = require('./activate');

app.get('/', function(req, res){
  res.send('index.html');
});

var statusNS = io.of('/status');
var status = new Status();
statusNS.on('connection', function(socket){
  console.log('a user connected');
  status.emit('subscribe');
  status.on('data', function (data) {
    socket.emit('news', {
      status: data
    })
  });

  socket.on('disconnect', function () {
      status.emit('unsubscribe');
  });
});

var activateNS = io.of('/activate');
var activate = new Activate();
activateNS.on('connection', function () {
  socket.on('activate', function (data) {
    activate.emit('activate', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
