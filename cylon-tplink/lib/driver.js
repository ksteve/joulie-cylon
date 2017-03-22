"use strict";

var Cylon = require("cylon");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
      get_power_state: this.getPowerState,
      set_power_state: this.setPowerState,
      get_consumption: this.getConsumption,
      get_sys_Info: this.getSysInfo
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

//commands
Driver.prototype.getPowerState = function getPowerState(){
  return this.connection.getPowerState();
};

Driver.prototype.setPowerState = function setPowerState(opts) {

  if(!opts.state){
    return ""
  }

  if (opts.state !== "0" && opts.state !== "1") {
      reject("state must be either 0 or 1");
  }

    var state = (opts.state === "1");
    return this.connection.setPowerState(state);
    // return new Promise(function(reject,resolve) {

    //
    //     var state = (opts.state === "1");
    //     this.connection.setPowerState(state)
    //         .then(resolve("success"))
    //         .catch(reject("error"));
    // });
};

Driver.prototype.getConsumption = function getConsumption() {
  return this.connection.getConsumption();
};

Driver.prototype.getSysInfo = function getSysInfo(){
  return this.connection.getSysInfo();
};
