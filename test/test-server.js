'use strict';

var PORT = process.env.PORT || 8080;
var Cylon = require('cylon');
var ServerSocket = require('socket.io-client')('https://joulie-core.herokuapp.com/api');

ServerSocket.emit('data publish', 'test data');

//allow robots to auto start on initialization
Cylon.config({
    mode: 'auto'
});

//setup cylon http api
//todo - ssl (security)
Cylon.api(
    'http',
    {
        ssl: false,
        host: '0.0.0.0',
        port: PORT
    });

function createRobotCmd(opts) {
    Cylon.robot({
        //setup robots name
        name: opts.name,

        //setup robotos events
        events: ['test', 'hello'],

        commands: function () {
            return {
                create_device: this.createDeviceCmd,
                remove_device: this.removeDeviceCmd
            };
        },

        createDeviceCmd: function (device) {
            console.log(device.name);
            console.log(device.driver);
            console.log(device.deviceId);
        },

        removeDeviceCmd: function (opts) {//
            var device = this.devices['thermostat'];//
            this.removeDevice(device, function () {
                return "removed";
            });
        },

        connections: {},
        devices: {},

        //a reference to timers which can be clearing on halt
        timers: [],

        work: function (my) {
            my.timers.push(every((10).seconds(), function () {
                console.log(my.name);
            }))
        }
    });
    Cylon.start();

    return "bot created";
};


function removeRobotCmd(opts) {
    Cylon.MCP.remove(opts);
    return "bot removed"
};

//setup MCP commnds
Cylon.MCP.commands = {
    create_robot: createRobotCmd,
    remove_robot: removeRobotCmd
};

module.exports.create_robot = createRobotCmd;
module.exports.remove_robot = removeRobotCmd;
module.exports.Cylon = Cylon;










