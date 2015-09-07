var Status = require('./status.js');

module.exports = function (io) {
  var status = new Status();
  io.on('connection', function (socket) {
    socket.auth = true;
    socket.on('authenticate', function (data) {
      //check the auth data sent by the client
      console.log(data.token);
    });

    setTimeout(function () {
      //If the socket didn't authenticate, disconnect it
      if (!socket.auth) {
        console.log("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, 1000);

    console.log('a user connected');

    socket.on('subscribe', function (payload) {
      return payload === 'detailed' ?
        status.emit('subscribe-full') :
        status.emit('subscribe')
        ;
    });

    status.on('data', function (data) {

      socket.emit('news', {
        status: data
      });

      if (data.processes) {
        socket.emit('news-detailed', {
          status: data.processes
        })
      }

    });

    socket.on('disconnect', function () {
      status.emit('unsubscribe');
      console.log('got disconnect');
    });
    socket.on('unsubscribe', function () {
      status.emit('unsubscribe');
      console.log('got unsubscribe');
    });
  });
};
