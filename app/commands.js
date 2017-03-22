/**
 * Created by Kyle on 2017-02-24.
 */

var _ = require("lodash");
var errors = require("./../errors");

module.exports = {
    resetRobots : function initCylon(opts) {
        var Cylon = this;
        return new Promise(function (resolve, reject) {

            if (!opts) {
                reject(new Error("no json"));
            }

            opts = {
                Robots: [
                    {
                        name: 'bot',

                        connections: {
                            loopback: {adaptor: "loopback"},
                        },

                        devices: {
                            loopback: {driver: 'ping', connection: 'loopback'}
                        },

                        work: function (my) {
                            my.connections;
                            // {
                            //   loopback: [Connection],
                            //   arduino:  [Connection]
                            // }

                            my.arduino;  // [Connection]
                            my.loopback; // [Device]
                        }
                    },
                    {
                        connections: {
                            loopback: {adaptor: "loopback"},
                        },

                        devices: {
                            loopback: {driver: 'ping', connection: 'loopback'}
                        },

                        work: function (my) {
                            my.connections;
                            // {
                            //   loopback: [Connection],
                            //   arduino:  [Connection]
                            // }

                            my.arduino;  // [Connection]
                            my.loopback; // [Device]
                        }
                    }
                ]
            };

            // let robots = JSON.parse(opts);
            _.forEach(opts.Robots, function (bot) {
                Cylon.robot(bot);
            });
            resolve("all robots started");
        });
    },
    resetRobot : function resetRobot(opts) {
        return new Promise(function (resolve, reject) {

        })
    },
    createRobot : function createRobot(opts) {
        var MCP = this;

        function createDevice(opts) {
            var robot = this;

            return new Promise(function (resolve, reject) {

                try {
                    var conn_name = opts.name;
                    var conn = {adaptor: opts.type, ip: opts.ip, port: opts.port};

                    var dev_name = opts.name;
                    var dev = {driver: opts.type, connection: conn_name};

                    robot.connection(conn_name, conn);
                    robot.device(dev_name, dev);
                } catch(err){
                    console.log(err);
                }

                //start the connection
                robot.startConnection(robot.connections[conn_name], function () {
                    //start the device
                    robot.startDevice(robot.devices[dev_name], function () {
                        resolve(self.devices[dev.name]);
                    });
                });
            })
        };

        function deleteDevice(opts){
            return new Promise(function(resolve,reject) {
                console.log(opts);
                var self = this;

                var device = self.devices[opts.name];
                if (!device) {
                    reject({
                        code:errors.DEVICE_NOT_FOUND,
                        message: "device: " + opts.name + " not found"
                    });
                }

                var connection = device.connection;
                if (connection) {
                    this.removeConnection(connection, function () {
                        console.log("connection removed");
                    });
                }

                this.removeDevice(device, function () {
                    console.log("device removed");
                });

                resolve("device removed");
            });
        }

        return new Promise(function (resolve, reject) {
            if (!opts.name) {
                reject({code: errors.MISSING_FIELD, message: "JSON must specify name"});
            }

            //create the robot
            try {
                var bot = MCP.create(opts);
                bot.commands = {
                    create_device: createDevice,
                    remove_device: deleteDevice
                }
            } catch (err) {
                console.log(err);
            }
            resolve({message: "Robot Created"});
        });
    }
};
