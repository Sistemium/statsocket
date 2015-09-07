module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('getSomeEntity', function(data) {
      var entities = [];
      _.each(data, function (item) {
        //get entity by xid
        var entity = 'Return entity from api';
        entities.push(entity);
      });

      socket.emit('entities', entities);
    })
  })
};
