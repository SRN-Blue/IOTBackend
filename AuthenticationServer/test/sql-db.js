process.env.NODE_ENV = "test";

let app = require("../app");
const User = require("../models/user");
const Device = require("../models/device");

const jwt = require("jsonwebtoken");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("SQL Database User CRUD", () => {
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

describe("SQL Database Device CRUD", () => {
  before(function () {
    Device.destroy({
      where: { location: "Area10" },
    }).catch((err) => {
      console.log(err);
    });
  });
  beforeEach((done) => setTimeout(done, 500));

  it("should fail to add new device with wrong credential!", (done) => {
    const token = jwt.sign(
      {
        email: "james@gmail.com",
        password:
          "$2a$12$HtJ8UgIksqBC9dx36hWjzeTqgqTJOc2UNE6mdlcfXzJCYeMWVjh8m",
      },
      "This is My secret key for JWT Token",
      { expiresIn: "1h" }
    );
    chai
      .request("http://127.0.0.1:8000/")
      .post("device/add")
      .set({ Authorization: `Bearer ${token + "!"}` })
      .send({ location: "Area10", sensortype: "DommyType" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("should Add new device to the databse with right creedentianls!", (done) => {
    const token = jwt.sign(
      {
        email: "james@gmail.com",
        password:
          "$2a$12$HtJ8UgIksqBC9dx36hWjzeTqgqTJOc2UNE6mdlcfXzJCYeMWVjh8m",
      },
      "This is My secret key for JWT Token",
      { expiresIn: "1h" }
    );
    chai
      .request("http://127.0.0.1:8000/")
      .post("device/add")
      .set({ Authorization: `Bearer ${token}` })
      .send({ location: "Area10", sensortype: "DommyType" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });

  it("should fail get devices ids with wrong credential!", (done) => {
    const token = jwt.sign(
      {
        email: "james@gmail.com",
        password:
          "$2a$12$HtJ8UgIksqBC9dx36hWjzeTqgqTJOc2UNE6mdlcfXzJCYeMWVjh8m",
      },
      "This is My secret key for JWT Token",
      { expiresIn: "1h" }
    );
    chai
      .request("http://127.0.0.1:8000/")
      .get("device/get-ids")
      .set({ Authorization: `Bearer ${token + "!"}` })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("should get all the ids of devices with right credentianls!", (done) => {
    const token = jwt.sign(
      {
        email: "james@gmail.com",
        password:
          "$2a$12$HtJ8UgIksqBC9dx36hWjzeTqgqTJOc2UNE6mdlcfXzJCYeMWVjh8m",
      },
      "This is My secret key for JWT Token",
      { expiresIn: "1h" }
    );
    chai
      .request("http://127.0.0.1:8000/")
      .get("device/get-ids")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});
