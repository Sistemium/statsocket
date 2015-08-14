var https = require('https');

function getCurrent(callback) {

  var statusUrl = 'https://api.sistemium.com/status?json';

  https.get(statusUrl, function(res) {

    var body = '';

    res.on('data', function (chunk) {
      body += chunk;
      console.log('Got response: ', chunk);
    });

    res.on('end', function () {
      var jsonData = JSON.parse(body);
      console.log('Got response: ', jsonData);
      callback(jsonData);
    });

  }).on('error', function(e) {
    console.log('Got error: ', e);
  });

}

exports.get = getCurrent;
