var Activate = require('./activate');

module.exports = function (io) {
  var activate = new Activate();
  io.on('connection', function () {
    socket.on('activate', function (data) {
      activate.emit('activate', data);
    });
  });
};
