process.env.NODE_ENV = 'test';
var chai        = require("chai");
var chaiHttp    = require("chai-http")
var server      = require("./../app/server");

var should      = chai.should();
var expect      = chai.expect();

chai.use(chaiHttp);

describe("/POST Create Robot", function(){
  it("should create a new robot", function (done) {
      chai.request('http://localhost:3000')
          .post('/api/commands/create_robot')
          .send({name: 'new robot'})
          .end(function(err, res){
              console.log(res.body);
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
          });
  });
});

