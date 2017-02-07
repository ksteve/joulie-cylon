
'use strict';

var PORT = process.env.PORT || 3000;
var Cylon = require('cylon');
var ServerSocket = require('socket.io-client')('https://joulie-core.herokuapp.com/api');

ServerSocket.emit('data publish', 'test data')

Cylon.robot({

    //setup robots name
    name: 'kyle',
    
    //setup robotos events
    events: ['test', 'status', 'hello', 'set_target_temp'],

    commands: function() {
        return {
            create_device: this.createDevice,
            remove_device: this.removeDevice
        };
    },

    createDevice: function(opts) {
        var y = opts.name;
    },

    removeDevice: function(opts) {
        var y = opts.name;
    },


    connections: {
        //setup connection to nest adaptor
        nest: { adaptor: "nest", accessToken: "c.k9ESFrVN5RRMohA9drUlQRc5VINAUgdJUXKd1HK8aVveAWB6snK6wMvMN2zImZ8GlJIeqtcrxPofkUXePQdyWMqcnkPRYO5x6TYOEBgbVjiUnhBdczmh9TeEdCAfiR0pysSGkOwyjYKtn5gI" }
    },

    devices: {
        //setup nest device driver
        thermostat: { driver: "nest-thermostat", deviceId: "sPmk4pq4eGMa7nT5eiYy5G66DVALDY-J" }
    },

    work: function(my) {
        
        my.on('set_target_temp', function (data) {
           my.thermostat.targetTemperatureC(data);
        });

        my.on('hello', function () {
            console.log('test emit');

            my.emit('test');
            ServerSocket.emit('data publish', 'test data')
        });

        // Listen to the status event to obtain all thermostat data
        my.thermostat.on("status", function(data) {
            my.emit('status', data);
        });

    }
});

Cylon.api(
    'http',
    {
        port: PORT
});

Cylon.start();




