/**
 * Created by Kyle on 2017-02-24.
 */

var _ = require("lodash");

module.exports = {
    initCylon : function(Cylon, opts){
        return new Promise(function(resolve, reject){

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
    }
};
