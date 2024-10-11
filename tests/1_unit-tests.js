const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("ConvertHandler", function () {
  test("it should return correct number from the input", () => {
    const input = "3/5l";
    const result = convertHandler.getNum(input);
    assert.equal(result, 3 / 5);
  });

  test("it should return the correct unit output", () => {
    const input = "3.4KG";
    const result = convertHandler.getUnit(input);
    assert.equal(result, "kg");
  });

  test("it should return the proper return unit", () => {
    const input = "3.5gal";
    const initialUnit = convertHandler.getUnit(input);
    const convertedUnit = convertHandler.getReturnUnit(initialUnit);
    assert.equal(convertedUnit, "L");
  });
});
