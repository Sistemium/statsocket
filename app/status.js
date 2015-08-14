var https = require('https');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();

var statusUrl = 'https://api.sistemium.com/status?json';

var lastData;

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
      events.emit('data',jsonData);
    });

  }).on('error', function(e) {
    console.log('Got error: ', e);
  });

}

events.on('newListener',function (ev,listener){
  console.log('Got new listener');
  listener(lastData);
});

setInterval (refreshData,1000);

exports.events = events;
