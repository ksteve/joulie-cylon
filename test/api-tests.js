process.env.NODE_ENV = 'test';
var chai        = require("chai");
var chaiHttp    = require("chai-http")
var server      = require("./../app/server");

var should     = chai.should();
var expect      = chai.expect;

chai.use(chaiHttp);

describe("api", function() {
    const localhost = 'http://localhost:3000';

    describe("/POST Create Robot", function () {
        it("should create a new robot", function () {
            chai.request(localhost)
                .post('/api/commands/create_robot')
                .send({name: 'botty'})
                .then(function (res) {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);
                    server.Cylon.MCP.robots['botty'].should.be.an.instanceOf(server.Cylon.Robot);
                })
                .catch(function (err) {
                    throw err;
                });
        });

        // it("should throw error", function(done){
        //     chai.request(localhost)
        //         .post('/api/commands/create_robot')
        //         .send({foo: 'bar'})
        //         .end(function (err, res) {
        //
        //           //  res.should.have.status(200);
        //            // res.body.should.have.all.keys('success', 'result');
        //            // res.body.succes.should.be.equal(false);
        //            // done();
        //         });
        // });

    });

    describe("/POST Remove Robot", function() {
        var bot = {name: "test_bot"};
        beforeEach(function(){
            server.Cylon.robot(bot);
        });

        it("should remove a robot",function(){
            chai.request(localhost)
                .post('/api/commands/remove_robot')
                .send({ name: bot.name})
                .then(function (res) {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);

                    var removed_bot = server.Cylon.MCP.robots[bot.name];
                    expect(removed_bot).to.equal(undefined);
                })
                .catch( function(err){
                    assert.isNotOk(err,'Promise error');
                });

        });

    });

    describe("/POST Create Device", function(){
        it("should create a new wemo device", function () {
            chai.request(localhost)
                .post('/api/robots/Test/commands/create_device')
                .send({name: 'wemo', type: 'wemo'})
                .then(function (res) {
                    console.log(res.body);
                   // res.should.have.status(500);
                   // res.body.should.have.all.keys('success', 'result');
                   // res.body.success.should.be.equal(true);
                   // server.Cylon.devices.wemo.should.be.an.instanceOf(Driver);
                })
                .catch(function(err){
                    //console.log(err);
                    expect(err).to.have.status(404);
                    expect(err).to.have.all.keys('success', 'error');
                    assert.isOk(err,'Promise error');
                    //throw err;
                });
        });

        it("should fail creating wemo device", function(){
            chai.request(localhost)
                .post('/api/robots/Test/commands/create_device')
                .send({name: 'wemo', type: 'wemo'})
                .then(function (res) {
                    console.log(res.body);
                    res.should.have.status(500);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(false);
                    server.Cylon.devices.wemo.should.be.an.instanceOf(Driver);
                })
                .catch(function(err){
                    console.log("exception");
                    throw err;
                });
        })

    });

    describe("/POST Remove Device", function(){
        it("should remove a wemo device", function () {
            chai.request(localhost)
                .post('/api/robots/Test/commands/remove_device')
                .send({name: 'wemo'})
                .then(function (res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);
                    server.Cylon.devices.wemo.should.be.equal(undefined);
                })
                .catch(function(err){
                    console.log("exception");
                    throw err;
                });
        });

        it("should fail", function () {
            chai.request(localhost)
                .post('/api/robots/Test/commands/remove_device')
                .send({name: 'notAdevice'})
                .then(function (res) {
                    console.log("SHOULD FAIL: ",res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);
                    server.Cylon.devices.wemo.should.be.equal(undefined);
                })
                .catch(function(err){
                    console.log("exception");
                    throw err;
                });
        });

    });

});

