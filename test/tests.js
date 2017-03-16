// var chai = require('chai');
// var expect      =  chai.expect;
// var assert      =  chai.assert;
//
// var chaiAsPromisd = require('chai-as-promised');
// var server      = require("./../app/server");
// var commands    = require("./../app/commands");
//
// chai.use(chaiAsPromisd);
// //
// // describe("Robots", function () {
// //
// //     describe("Robot Creation", function(){
// //       it("should create a new robot", function () {
// //           server.Cylon({
// //               name: "bot"
// //           });
// //           expect(Cylon.robots["bot"]).to.not.be.undefined;
// //           //var ret = server.create_robot({name:"hello"});
// //           //expect(ret).to.equal("bot created");
// //       });
// //     });
// //
// //     describe("Robot Destuction", function () {
// //         it("should remove a robot", function () {
// //             server.Cylon.MCP.remove({name: "bot"});
// //             expect(Cylon.MCP.robots["bot"]).to.be.undefined;
// //         });
// //     });
// // });
// //
// // describe("Devices", function () {
// //
// //     describe("Device Creation", function(){
// //         it("should create a new robot", function () {
// //             server.Cylon({
// //                 name: "bot"
// //             });
// //             expect(Cylon.robots["bot"]).to.not.be.undefined;
// //             //var ret = server.create_robot({name:"hello"});
// //
// //             //expect(ret).to.equal("bot created");
// //         });
// //     });
// //
// //     describe("Device Destuction", function () {
// //         it("should remove a robot", function () {
// //             server.Cylon.MCP.remove({name: "bot"});
// //             expect(Cylon.MCP.robots["bot"]).to.be.undefined;
// //         });
// //     });
// // });
//
// describe("Joulie Custom Commands", function () {
//     describe("Init Robots", function(){
//         it("should initialize robots", function() {
//             return commands.initCylon(server.Cylon, {}).should.be.fulfilled;
//         });
//
//         it("should fail init", function() {
//             return commands.initCylon(server.Cylon, null).should.be.rejected;
//         });
//     });
// });


