var https = require('http');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var config = require('./config.js').status;
/*
<<<<<<< HEAD
*/

var statusUrl = 'https://api.sistemium.com/status?json';
var statusUrlFull = 'https://api.sistemium.com/status?json&full';
var urlSt = statusUrlFull;

/* =======
var statusUrl = config.url + '?json';
 >>>>>>> origin/master */

var lastData, interval, clientCount = 0;

var Status = function () {
  var self = this;

  this.on('subscribe', function () {
    interval = interval || setInterval(refreshData, 1000);
    clientCount++;
    console.log('subscribe, clientCount:', clientCount);
  });

  this.on('subscribe-full', function () {
    interval = interval || setInterval(refreshData, 1000);
    clientCount++;
    console.log('subscribe-full, clientCount:', clientCount);
  });


  this.on('unsubscribe', function () {
    if (--clientCount<=0) {
      clientCount = 0;
      clearInterval(interval);
      interval = undefined;
      console.log('interval cleared');
    }
    console.log('unsubscribe, clientCount:', clientCount);
  });

  function refreshData () {
    https.get(urlSt, function(res) {

      var body = '';

      res.on('data', function (chunk) {
        body += chunk;
      });

      res.on('end', function () {
        var jsonData = JSON.parse(body);
        console.log('Got response: ', body.length, ' from: ', urlSt);
        self.emit('data', jsonData);
      });

    }).on('error', function(e) {
      console.log('Got error: ', e);
    });
  }
};

util.inherits(Status, EventEmitter);
module.exports = Status;
