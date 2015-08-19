var AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});
var config = require('./config');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();

events.on('activate', function (data) {
    var dynamodb = new AWS.DynamoDB(config);
    dynamodb.putItem({
        Item: {
            //xid
            xid: {
              S: 'xid'
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

exports.events = events;