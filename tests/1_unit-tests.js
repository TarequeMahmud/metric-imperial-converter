const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const input = process.env.input;

//
// = convertHandler.spellOutUnit(returnUnit);
// convertHandler.convert(initNum, initUnit);
// const stringToReturn = convertHandler.getString(
//   initNum,
//   initSpellOutUnit,
//   returnNum,
//   returnSpellOutUnit
// );

suite("Unit Tests", function () {
  suite("Testing getNum() function", () => {
    test("convertHandler should correctly read a whole number input.", (done) => {
      const initNum = "5L";
      assert.equal(convertHandler.getNum(initNum), 5);
      done();
    });
    test("convertHandler should correctly read a decimal input.", (done) => {
      const initNum = "5.2L";
      assert.equal(convertHandler.getNum(initNum), 5.2);
      done();
    });
    test("convertHandler should correctly read a fractional input.", (done) => {
      const initNum = "5/2L";
      assert.equal(convertHandler.getNum(initNum), 5 / 2);
      done();
    });
    test("convertHandler should correctly read a fractional input with a decimal.", (done) => {
      const initNum = "5.1/2L";
      assert.equal(convertHandler.getNum(initNum), 2.55);
      done();
    });
    test("convertHandler should correctly return an error on a double-fraction", (done) => {
      const initNum = "5/1/2L";
      assert.equal(convertHandler.getNum(initNum), null);
      done();
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", (done) => {
      const initNum = "L";
      assert.equal(convertHandler.getNum(initNum), 1);
      done();
    });
  });

  suite("Testing getUnit", () => {
    test("convertHandler should correctly read each valid input unit.", () => {
      const initNum = "5L";
      assert.equal(convertHandler.getUnit(initNum), "L");
    });

    test("convertHandler should correctly return an error for an invalid input unit.", () => {
      const initNum = "5a";
      assert.equal(convertHandler.getUnit(initNum), null);
    });

    test("convertHandler should return the correct return unit for each valid input unit.", () => {
      const initUnit = "L";
      assert.equal(convertHandler.getReturnUnit(initUnit), "gal");
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
      const initUnit = "L";
      assert.equal(convertHandler.spellOutUnit(initUnit), "liters");
    });
  });

  suite("Testing Conversion abilitiy", () => {
    test("convertHandler should correctly convert gal to L", () => {
      assert.isAtLeast(convertHandler.convert(1, "gal"), 3.78541);
    });

    test("convertHandler should correctly convert L to gal", () => {
      assert.isAtLeast(convertHandler.convert(3.78541, "L"), 1);
    });
    test("convertHandler should correctly convert mi to km", () => {
      assert.isAtLeast(convertHandler.convert(1, "mi"), 1.60934);
    });
    test("convertHandler should correctly convert km to mi", () => {
      assert.isAtLeast(convertHandler.convert(1.60934, "km"), 1);
    });
    test("convertHandler should correctly convert lbs to kg", () => {
      assert.isAtLeast(convertHandler.convert(1, "lbs"), 0.45359);
    });
    test("convertHandler should correctly convert kg to lb", () => {
      assert.isAtLeast(convertHandler.convert(0.45359, "kg"), 1);
    });
  });

  // test(".getString() should return proper string to return", () => {
  //   assert.equal(stringToReturn, process.env.stringToReturn);
  // });
});
