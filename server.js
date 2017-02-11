'use strict';

const uuidV4 = require("uuid/v4");

var PORT = process.env.PORT || 3000;
var Cylon = require('cylon');
var _ = Cylon.Utils;
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

function createRobotCmd(opts){
    return Cylon.robot({
        //setup robots name
        name: opts.name,

        //generate random UUID
        UUID: uuidV4(),

        //setup robotos events
        events: ['test', 'hello'],

        //setup robots commands
        commands: function() {
            return {
                create_device: this.createDeviceCmd,
                remove_device: this.removeDeviceCmd
            };
        },

        //create new device
        createDeviceCmd: function(opts) {
            var self = this;

            //create the connection
            self.connection(opts.conn_name, {adaptor: opts.adaptor, accessToken: opts.token});

            //craete the device
            self.device(opts.device_name, {connection: opts.conn_name, driver: opts.driver, UUID: uuidV4()});

            //start the connection
            self.startConnection(self.connections[opts.conn_name], function (err) {

                if(err) return err;
                //start the device
                self.startDevice(self.devices[opts.device_name], function() {v
                    console.log("Device Ready");
                    return self.devices[opts.device_name];
                });
            });
        },

        //remove device function
        removeDeviceCmd: function(opts) {//
            var device = this.devices[opts.name];//
            this.removeDevice(device, function(){
              return "removed";
            });
        },

        connections: {},
        devices: {},

        //a reference to timers which can be cleared on halt
        timers: [],

        work: function(my) {
            my.timers.push(every((1).minutes(), function() {
                console.log(my.name);
                ServerSocket.emit('data publish', {kw: 10});
            }));
        }
    });
};

//remove a robot
function removeRobotCmd(opts){
    return Cylon.MCP.remove(opts);
};

//setup MCP commnds
Cylon.MCP.commands = {
    create_robot: createRobotCmd,
    remove_robot: removeRobotCmd
};

module.exports.create_robot = createRobotCmd;
module.exports.remove_robot = removeRobotCmd;
module.exports.Cylon = Cylon;








