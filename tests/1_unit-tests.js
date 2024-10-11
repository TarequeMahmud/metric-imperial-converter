const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const input = "3.5gal";
const initNum = convertHandler.getNum(input);
const initUnit = convertHandler.getUnit(input);
const returnUnit = convertHandler.getReturnUnit(initUnit);
const initSpellOutUnit = convertHandler.spellOutUnit(initUnit);
const returnSpellOutUnit = convertHandler.spellOutUnit(returnUnit);
const returnNum = convertHandler.convert(initNum, initUnit);
const stringToReturn = convertHandler.getString(
  initNum,
  initSpellOutUnit,
  returnNum,
  returnSpellOutUnit
);

suite("ConvertHandler", function () {
  test(".getNum() should return correct number from the input", () => {
    assert.equal(initNum, 3.5);
  });

  test(".getUnit() should return the correct unit output", () => {
    assert.equal(initUnit, "gal");
  });

  test(".getReturnUnit() should return the proper return unit", () => {
    assert.equal(returnUnit, "L");
  });

  test(".spellOutUnit() should return proper spellOutUnit", () => {
    assert.equal(initSpellOutUnit, "gallons");
    assert.equal(returnSpellOutUnit, "litres");
  });

  test(".convert() should return proper converted number", () => {
    assert.equal(returnNum, 13.24894);
  });

  test(".getString() should return proper string to return", () => {
    assert.equal(stringToReturn, "3.5 gallons converts to 13.24894 litres");
  });
});
