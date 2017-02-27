'use strict';

var PORT = process.env.PORT || 3000;
var Cylon = require('../cylon');
var http = require("http");
var commands = require("./commands");
const uuidV4 = require("uuid/v4");
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

//setup test robot
Cylon.robot({
    name: "Test",

    UUID: uuidV4(),
    events: ['test', 'hello'],
    connections: {},
    devices: {},

    //a reference to timers which can be cleared on halt
    timers: [],

    work: function(my) {
        my.timers.push(every((5).minutes(), function() {
            console.log(my.name);
            var energy = Math.floor((Math.random() * 100) + 20);
            ServerSocket.emit('data publish', {kw: energy});
        }));
    }

});

setInterval(function(){
    http.get("http://joulie-core.herokuapp.com");
}, 60 * 5000);

//initialize all robots
Cylon.MCP.commands["init-cylon"] = function(opts){
    //var self = this;
    return commands.initCylon(Cylon, opts)
};

module.exports.Cylon = Cylon;








