var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var status = require('./status.js');

app.use(express.static('public'));
app.get('/', function(req, res){
  res.send('index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

io.on('connection', function(socket){
  console.log('a user connected');

  status.events.on('data',function (data){
    socket.emit('news', {
//      type:'welcome',
      status: data
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


module.exports = function () {
  return 'Hello, world';
};
