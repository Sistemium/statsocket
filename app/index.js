var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var status = require('./status.js');

app.get('/', function(req, res){
  res.send('index.html');
});
var connected = false;
io.on('connection', function(socket){
  console.log('a user connected');

  if (!connected) {
    connected = true;
    status.events.emit('subscribe');
  }

  status.events.on('data',function (data){
    socket.emit('news', {
//      type:'welcome',
      status: data
    });
  });

  socket.on('disconnect', function () {
    if (io.sockets.sockets.length === 0) {
      status.events.emit('unsubscribe');
      connected = false;
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});