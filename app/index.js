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
  socket.auth = false;
  socket.on('authenticate', function(data){
    //check the auth data sent by the client
    console.log(data.token);

    //TODO: check token
    //checkAuthToken(data.token, function(err, success){
    //  if (!err && success){
    //    console.log("Authenticated socket ", socket.id);
    //    socket.auth = true;
    //  }
    //});
  });

  setTimeout(function(){
    //If the socket didn't authenticate, disconnect it
    if (!socket.auth) {
      console.log("Disconnecting socket ", socket.id);
      socket.disconnect('unauthorized');
    }
  }, 1000);

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
