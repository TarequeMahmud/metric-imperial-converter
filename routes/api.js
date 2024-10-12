"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    if (initNum === null && initUnit === null) {
      return res.send("invalid number and unit");
    }
    if (initNum === null) {
      return res.send("invalid number");
    }
    if (initUnit === null) {
      return res.send("invalid unit");
    }

    const initSpellOutUnit = convertHandler.spellOutUnit(initUnit);
    const returnSpellOutUnit = convertHandler.spellOutUnit(returnUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const stringToReturn = convertHandler.getString(
      initNum,
      initSpellOutUnit,
      returnNum,
      returnSpellOutUnit
    );
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: stringToReturn,
    });
  });
};
