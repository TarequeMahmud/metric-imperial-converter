const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert/?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
  test("Convert an invalid input such as 32g: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert/?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, null);
        done();
      });
  });
  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert/?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, null);
        done();
      });
  });
  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert/?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, null);
        assert.equal(res.body.returnUnit, null);
        done();
      });
  });

  test("Convert with no number such as kg: GET request to /api/convert.", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert/?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});
