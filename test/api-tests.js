process.env.NODE_ENV = 'test';
var chai        = require("chai");
var chaiHttp    = require("chai-http")
var server      = require("./../app/server");

var should      = chai.should();
var expect      = chai.expect();

chai.use(chaiHttp);

describe("api", function() {
    const localhost = 'http://localhost:3000';

    describe("/POST Create Robot", function () {
        it("should create a new robot", function (done) {
            chai.request(localhost)
                .post('/api/commands/create_robot')
                .send({name: 'botty'})
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);
                    server.Cylon.MCP.robots['botty'].should.be.an.instanceOf(server.Cylon.Robot);
                    done();
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

    });

    describe("/POST Create Device", function(){
        it("should create a new wemo device", function (done) {
            chai.request(localhost)
                .post('/api/robots/Test/commands/create_device')
                .send({name: 'wemo', type: 'wemo'})
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);
                    server.Cylon.devices.wemo.should.be.an.instanceOf(Driver);
                    done();
                })
                .catch(function(err){
                    console.log("exception");
                    done()
                });
        });
    });

    describe("/POST Remove Device", function(){
        it("should create a new wemo device", function (done) {
            chai.request(localhost)
                .post('/api/robots/Test/commands/remove_device')
                .send({name: 'wemo'})
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.all.keys('success', 'result');
                    res.body.success.should.be.equal(true);
                    server.Cylon.devices.wemo.should.be.undefined;
                    done();
                })
                .catch(function(err){
                    console.log("exception");
                    done()
                });
        });
    });

});

