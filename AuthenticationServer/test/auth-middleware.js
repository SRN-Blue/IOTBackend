process.env.NODE_ENV = 'test';

let app = require("../app");

const jwt = require("jsonwebtoken");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("JWT Authentication", () => {
  beforeEach((done) => setTimeout(done, 500));

  it("should throw an error if the bearer Token is not Provided!", (done) => {
    const token = "";
    chai
      .request("http://127.0.0.1:8000/")
      .get("user/jwt-authentication")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have
          .property("message")
          .eql("Error!Token was not provided.");
        done();
      });
  });

  it("should throw an error if the bearer Token is not Valid!", (done) => {
    const token = "ww11ee";
    chai
      .request("http://127.0.0.1:8000/")
      .get("user/jwt-authentication")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have.property("success").eql(false);
        done();
      });
  });

  it("should response with no error with valid JWT Token", (done) => {
    const token = jwt.sign(
      {
        email: "james@gmail.com",
        password:
          "$2a$12$29nG0hL5RZgMtKT/./J.CeQkxNJa.IhrkPqafALWf1m/dn9wxXBNq",
      },
      "This is My secret key for JWT Token",
      { expiresIn: "1h" }
    );

    chai
      .request("http://127.0.0.1:8000/")
      .get("user/jwt-authentication")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.should.have.property("message").eql("None");
        res.body.should.have.property("success").eql(true);
        done();
      });
  });
});
