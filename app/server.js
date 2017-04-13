'use strict';

var PORT = process.env.PORT || 3000;
var Cylon = require('./../cylon');
var http = require("http");
var commands = require("./commands");

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

//setup MCP commands
Cylon.MCP.commands["create_robot"] = commands.createRobot;
Cylon.MCP.commands["remove_robot"] = commands.removeRobot;
Cylon.MCP.commands["reset_robot"] = commands.resetRobot;

//start a test robot
commands.createRobot.call(Cylon.MCP, {name: "test"});

//todo : ping server-core on start up to get robots and devices

module.exports.Cylon = Cylon;
