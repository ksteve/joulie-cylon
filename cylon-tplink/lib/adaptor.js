"use strict";
const Hs100Api = require("hs100-api");
const Cylon = require("cylon");
const Commands = require("./commands");
const TpLink = new Hs100Api.Client();


var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

    if(opts.ip){
        this.ip = opts.ip;
        this.port = opts.port;
        this.host = this.ip + ":" + this.port;
        this.setupUrl = "http://" + this.host + "/setup.xml";
    } else if(opts.host) {
        this.host = opts.host;
        this.setupUrl = "http://" + this.host + "/setup.xml";
    }
};
Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {

  if(this.setupUrl) {
      const plug = TpLink.getPlug({host: this.ip});
      plug.getInfo().then(console.log);
      this.connector = plug;
      this.proxyMethods(Commands, this.connector, this);
      return callback();
  }

  TpLink.startDiscovery().on('plug-new', function(plug){
    plug.getInfo().then(console.log);

    plug.getScanInfo().then(console.log);
    this.connector = plug;
    this.proxyMethods(Commands, this.connector, this);

    return callback();
  });

};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};
