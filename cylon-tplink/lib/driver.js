"use strict";

var Cylon = require("cylon");

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  // Include a list of commands that will be made available to external APIs.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
      getPowerState: this.getPowerState,
      setPowerState: this.setPowerState,
      getConsumption: this.getConsumption,
      getSysInfo: this.getSysInfo
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.getPowerState = function getPowerState(){
  return this.connection.getPowerState();
};

Driver.prototype.setPowerState = function setPowerState(opts) {
    return new Promise(function(reject,resolve) {
        if (opts.state !== "0" && opts.state !== "1") {
            reject({success: false, error: "state must be either 0 or 1"});
        }

        var state = (opts.state === "1");
        this.connection.setPowerState(state)
            .then(resolve({sucess:true}))
            .catch(reject());
    });
};

Driver.prototype.getConsumption = function getConsumption() {
  return this.connection.getConsumption();
};

Driver.prototype.getSysInfo = function getSysInfo(){
  return this.connection.getSysInfo();
};


