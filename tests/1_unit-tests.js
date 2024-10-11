const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const input = process.env.input;
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
    assert.equal(initNum, process.env.initNum);
  });

  test(".getUnit() should return the correct unit output", () => {
    assert.equal(initUnit, process.env.initUnit);
  });

  test(".getReturnUnit() should return the proper return unit", () => {
    assert.equal(returnUnit, process.env.returnUnit);
  });

  test(".spellOutUnit() should return proper spellOutUnit", () => {
    assert.equal(initSpellOutUnit, process.env.initSpellOutUnit);
    assert.equal(returnSpellOutUnit, process.env.returnSpellOutUnit);
  });

  test(".convert() should return proper converted number", () => {
    assert.isAtLeast(returnNum, Number(process.env.returnNum));
  });

  test(".getString() should return proper string to return", () => {
    assert.equal(stringToReturn, process.env.stringToReturn);
  });
});
