"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getString(input);
    const returnUnit = convertHandler.returnUnit(initUnit);
    const spellOutUnit = convertHandler.spellOutUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const stringToReturn = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
  });
};
