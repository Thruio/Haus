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

var app = {
    displayBridges:  function(bridge) {
        console.log("Hue Bridges Found: " + JSON.stringify(bridge));
    },
    connectToBridges: function(bridges){
        bridges.forEach(app.connectToBridge);
    },
    connectToBridge: function(bridge){
        console.log("Connecting to bridge " + bridge.ipaddress);
        var username = 'haus' + Math.random();
        var api = new HueApi(bridge.ipaddress, username);
        console.log("waiting for button push?");
        api.config(function(err, config){
            console.log("api.config callback");
            if (err) throw err;
            console.log(JSON.stringify(config, null, 2));
        });
    }
};

hue.nupnpSearch(function(err, result) {
    if (err){
        throw err;
    }
    app.displayBridges(result);
    app.connectToBridges(result);
});