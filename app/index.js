var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var status = require('./status.js');

app.get('/', function(req, res){
  res.send('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  status.events.on('data',function (data){
    socket.emit('news', {
//      type:'welcome',
      status: data
    });
  });

  socket.on('my other event', function(data) {
    console.log(data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


module.exports = function () {
  return 'Hello, world';
};
