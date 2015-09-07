var AWS = require('aws-sdk')
  , config = require('./../config').awsCredentials
  , EventEmitter = require('events').EventEmitter
  , util = require('util')
  , uuid = require('node-uuid');


function Activate() {
  AWS.config.update({region: 'eu-west-1'})

  this.on('activate', function (data) {
    var dynamodb = new AWS.DynamoDB(config);
    dynamodb.putItem({
      Item: {
        //xid
        xid: {
          S: uuid.v4()
        },
        token: {
          S: data.info.token
        },
        url: {
          S: data.info.url
        },
        event: {
          S: data.info.event
        },
        device: {
          S: data.info.device
        }
      },
      TableName: 'SocketEvent'
    }, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  });
}

util.inherits(Activate, EventEmitter);
module.exports = Activate;
