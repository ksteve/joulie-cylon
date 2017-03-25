"use strict";
const Hs100Api = require("hs100-api");
const Cylon = require("cylon");
const Commands = require("./commands");
const TpLink = new Hs100Api.Client();
const errors = require("../errors");

var Adaptor = module.exports = function Adaptor(opts) {

  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};

  this.ip = opts.ip;
  if(!this.ip){
      var e =  {code:errors.MISSING_FIELD, message:"No ip specified for TP-Link adaptor. Cannot proceed"};
      throw e;
  }
  this.port = opts.port || 9999;
  this.host = this.ip + ":" + this.port;
};
Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {

  const plug = TpLink.getPlug({host: this.ip});

  if(!plug.client) {
      this.connector = null;
      var err = "could not connect to tplink at " + this.host;
      return callback(err);
  } else {
      this.connector = plug;
      this.proxyMethods(Commands, this.connector, this);
      return callback();
  }
  // } else {
  //   TpLink.startDiscovery().on('plug-new', function(plug){
  //     plug.getInfo().then(console.log);
  //
  //     plug.getScanInfo().then(console.log);
  //     this.connector = plug;
  //     this.proxyMethods(Commands, this.connector, this);
  //     return callback();
  //   });
  // }
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};
