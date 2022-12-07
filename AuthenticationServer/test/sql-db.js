process.env.NODE_ENV = "test";

let app = require("../app");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("SQL Database", () => {
  before(function () {
    User.destroy({
      where: { name: "james" },
    }).catch((err) => {
      console.log(err);
    });
  });
  beforeEach((done) => setTimeout(done, 500));

  it("should throw an error if User datas are not valid!", (done) => {
    chai
      .request("http://127.0.0.1:8000/")
      .post("user/signup")
      .send({ name: "james", password: "IE@1998" })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("should return success message if user is addedd successfully!", (done) => {
    chai
      .request("http://127.0.0.1:8000/")
      .post("user/signup")
      .send({ name: "james", email: "james@gmail.com", password: "IE@1998" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have
          .property("message")
          .eql("User Has Been Created Successfully");
        done();
      });
  });

  it("should throw an error if user already exists!", (done) => {
    chai
      .request("http://127.0.0.1:8000/")
      .post("user/signup")
      .send({ name: "james", email: "james@gmail.com", password: "IE@1998" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have.property("message").eql("User already exists!");
        done();
      });
  });
});
