var os = require("os");
var redis = require("redis"),
    redisSender = redis.createClient({
        host: 'redis',
        port: 6379
    }),
    redisReceiver = redis.createClient({
        host: 'redis',
        port: 6379
    });


redisReceiver.on('state_change', function(channel, message){
    console.log("Redis: " + channel + ": " + message);
});

redisReceiver.subscribe("lights");
console.log("Subscribed to Redis");

var hue = require('node-hue-api');

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

hue.nupnpSearch(function(err, result) {
    if (err) throw err;
    displayBridges(result);
});