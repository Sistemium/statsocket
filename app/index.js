var express = require('express')
  , app = express()
  , path = require('path')
  , http = require('http').Server(app)
  , config = require('./config')
  , statusNS = require('./namespaces/statusNS')
  , activateNS = require('./namespaces/activateNS')
  , entitiesByXidNS =require('./namespaces/entitiesByXidNS');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.send('index.html');
});

var io = require('socket.io')(http, {
  pingTimeout: config.pingTimeout, pingInterval: config.pingInterval
});

statusNS(io.of('/status'));
activateNS(io.of('/activate'));
entitiesByXidNS(io.of('/entitiesByXid'));

http.listen(config.port, function () {
  console.log('listening on *:%d', config.port);
});
