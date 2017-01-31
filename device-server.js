
'use strict';

var PORT = process.env.PORT || 3000;
var Cylon = require('cylon');

Cylon.robot({

    name: 'kyle',
    events: ['test', 'status', 'hello'],

    connections: {
        nest: { adaptor: "nest", accessToken: "c.k9ESFrVN5RRMohA9drUlQRc5VINAUgdJUXKd1HK8aVveAWB6snK6wMvMN2zImZ8GlJIeqtcrxPofkUXePQdyWMqcnkPRYO5x6TYOEBgbVjiUnhBdczmh9TeEdCAfiR0pysSGkOwyjYKtn5gI" }
    },

    devices: {
        thermostat: { driver: "nest-thermostat", deviceId: "sPmk4pq4eGMa7nT5eiYy5G66DVALDY-J" }
    },

    work: function(my) {
        // We setup two time outs to turn on
        // and turn off the led device.
        // this will trigger an event that
        // we'll to listen to in the client
        my.on('hello', function () {
            my.emit('test');
        });

        // Listen to the status event to obtain all thermostat
        //
        my.thermostat.on("status", function(data) {
            my.emit('status', data);
        });

    }
});

Cylon.api(
    'socketio',
    {
        host: '0.0.0.0',
        port: PORT
});

Cylon.start();




