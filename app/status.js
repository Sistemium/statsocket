var https = require('https');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();

var statusUrl = 'https://api.sistemium.com/status?json';

var lastData, interval;

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
events.on('unsubscribe', function () {
  console.log('unsubsbcribe');
  clearInterval(interval);
});

events.on('subscribe', function () {
  console.log('subsbcribe');
  interval = setInterval(refreshData, 1000);
});
exports.events = events;
