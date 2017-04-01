"use strict";
var Hs100Api = require("hs100-api");
var Cylon = require("cylon");
var Commands = require("./commands");
var errors = require("../errors");

var Adaptor = module.exports = function Adaptor(opts) {

  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};

  this.ip = opts.ip;
  if(!this.ip){
      var e =  {
          code:errors.MISSING_FIELD,
          message:"No ip specified for TP-Link adaptor. Cannot proceed"
      };
      throw e;
  }
  this.port = opts.port || 9999;
  this.host = this.ip + ":" + this.port;
};
Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function(callback) {

    var adaptor = this;
    const client =  new Hs100Api.Client();
    const plug = client.getPlug({host: this.ip, port: this.port});
    this.connector = plug;

    plug.getInfo()
        .then(function(result){
            console.log(result);
            adaptor.proxyMethods(Commands, adaptor.connector, adaptor);
            callback();
        })
        .catch(function(err){
       // console.log(err);
            var error = "could not connect to tplink at " + adaptor.host;
            callback(error);
        });
};

Adaptor.prototype.disconnect = function(callback) {
  callback();
};
