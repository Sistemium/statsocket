var https = require('https');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var statusUrl = 'https://api.sistemium.com/status?json';

var lastData, interval;

var Status = function () {
  var self = this;

  this.on('subscribe', function () {
    interval = setInterval(refreshData, 1000);
    console.log('subscribe');
  });

  this.on('unsubscribe', function () {
    clearInterval(interval);
    console.log('unsubscribe');
  });

  function refreshData () {
    https.get(statusUrl, function(res) {

      var body = '';

      res.on('data', function (chunk) {
        body += chunk;
      });

      res.on('end', function () {
        var jsonData = JSON.parse(body);
        //console.log('Got response: ', jsonData);
        lastData = jsonData;
        self.emit('data',jsonData);
      });

    }).on('error', function(e) {
      console.log('Got error: ', e);
    });
  }
};

util.inherits(Status, EventEmitter);
module.exports = Status;
