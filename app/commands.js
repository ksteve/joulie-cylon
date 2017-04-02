/**
 * Created by Kyle on 2017-02-24.
 */

var _ = require("lodash");
var errors = require("./../errors");
var ServerSocket = require('socket.io-client')('localhost:8000/api');

module.exports = {
    resetRobots : function resetRobots(opts) {
        var Cylon = this;
        console.log('[ Joulie-Cylon ] - Resetting Robots');
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
        console.log('[ Joulie-Cylon ] - Resetting Robot');
        return new Promise(function (resolve, reject) {

        })
    },
    createRobot : function createRobot(opts) {
        console.log('[ Joulie-Cylon ] - Creating Robot');
        var MCP = this;
        function createDevice(opts) {
            var robot = this;
            console.log('[ ' + robot +' ] - Creating Device');

            return new Promise(function (resolve, reject) {

                var conn_name = opts.name;
                var conn = {adaptor: opts.type, ip: opts.ip, port: opts.port};

                var dev_name = opts.name;
                var dev = {driver: opts.type, connection: conn_name};

                robot.connection(conn_name, conn);
                robot.device(dev_name, dev);

                //start the connection
                robot.startConnection(robot.connections[conn_name], function (err) {
                    if (err) {
                        delete robot.connections[conn_name];
                        delete robot.devices[dev_name];
                        reject({code: errors.COULD_NOT_CONNECT, message: err})
                    } else {
                        //start the device
                        robot.startDevice(robot.devices[dev_name], function (err) {
                            if (err) {
                                reject({code: errors.COULD_NOT_START_DEVICE, message: err})
                            }
                            resolve(robot.devices[dev.name]);
                        });
                    }
                });
            })
        };
        function deleteDevice(opts) {
            var robot = this;
            console.log('[ ' + robot +' ] - Deleting Device');

            return new Promise(function (resolve, reject) {
                console.log(opts);

                //check if device exits
                var device = robot.devices[opts.name];
                if (!device) {
                    reject({
                        code: errors.DEVICE_NOT_FOUND,
                        message: "device: " + opts.name + " not found"
                    });
                }

                //delete the devices connection first
                var connection = device.connection;
                if (connection) {
                    robot.removeConnection(connection, function () {
                        console.log("connection removed");
                        robot.removeDevice(device, function () {
                            console.log("device removed");
                            resolve("device removed");
                        });
                    });
                }
            });
        }
        function work(my) {
            my.timers.push(every((1).minutes(), function () {

                console.log(my.name);
                //var energy = Math.floor((Math.random() * 100) + 20);
                if (my.devices) {
                    for (var deviceName in my.devices) {
                        var device = my.devices[deviceName];
                            if (device.getConsumption && device.connection.getConsumption) {
                                device.getConsumption()
                                    .then(function (result) {
                                        console.log(result);
                                        ServerSocket.emit('data publish', result);
                                    })
                                    .catch(function (err) {
                                        console.log(err);
                                    })
                            }
                        }
                    }
            }));
        };

        return new Promise(function (resolve, reject) {
            if (!opts.name) {
                reject({code: errors.MISSING_FIELD, message: "JSON must specify name"});
            }

            opts.timers = [];
            opts.work = work;

            //create the robot
            try {
                var bot = MCP.create(opts);
                bot.commands = {
                    create_device: createDevice,
                    remove_device: deleteDevice
                }
            } catch (err) {
                console.log(err);
                reject({message: err});
            }
            resolve({message: "Robot Created"});
        });
    },
    removeRobot : function removeRobot(opts) {
        console.log('[ Joulie-Cylon ] - Removing Robot');
        var MCP = this;
        opts = opts || {};

        return new Promise(function(resolve, reject){

            if(!opts.name){
                reject({code: errors.MISSING_FIELD, message: "no name parameter"});
            }
            if(!MCP.robots[opts.name]){
                var str = "Robot with name: " + opts.name + " does not exist.";
                reject({code: errors.ROBOT_NOT_EXIST, message:str});
            }

            MCP.remove(opts, function(err){
                if(err){
                    reject({code:errors.REQUEST_FAILED, message: err});
                }

                resolve("Robot Removed");
            });
        });
    }
};
