/**
 * Created by Kyle on 2017-02-24.
 */

var _ = require("lodash");

module.exports = {
    initCylon : function initCylon(opts){
        var Cylon = this;
        return new Promise(function(resolve, reject){

            if(!opts){
                reject(new Error("no json"));
            }

            opts = {
                Robots : [
                    {
                        name : 'bot',

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
            _.forEach(opts.Robots,function(bot){
                Cylon.robot(bot);
            });
            resolve("all robots started");
        });
    },

    resetRobot : function resetRobot(opts){
      return new Promise(function(resolve, reject){

      })
    },

    createDevice : function createDevice(opts){

        var Cylon = this;

        return new Promise(function(resolve, reject){
            var conn_name = opts.name;

            var conn = {name: opts.name, adaptor: opts.type, ip : opts.ip, port: opts.port };
            // this.connections[conn_name] = conn;

            var dev = {};
            dev.name = opts.name;
            dev.driver = opts.type;
            dev.connection = conn.name;

            this.connection(conn_name, conn);

            //craete the device
            this.device(dev.name, dev);

            //start the connection
            this.startConnection(conn, function () {
                //start the device
                self.startDevice(dev, function() {
                    console.log("Device Ready");
                    return self.devices[dev.name];
                });
            });
        })
    }



};
