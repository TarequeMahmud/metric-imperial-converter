function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    if (/^[a-zA-Z]+$/g.test(input)) {
      result = 1;
      return result;
    }
    const number = input.match(
      /^[0-9]+(?![./])|^[0-9]+([/.][0-9]+(?![./]))|^[0-9]+(.[0-9]+)?\/[0-9]+(.[0-9]+)?(?![./])/g
    );

    if (number === null) return null;
    result = number[0];
    if (result.includes("/")) {
      let numberArray = result.split("/");
      result = numberArray[0] / numberArray[1];
    }
    return isNaN(result) ? null : Number(result);
  };

  this.getUnit = function (input) {
    let unit = input.match(/[a-zA-Z]+/g);
    if (unit === null) {
      return null;
    }
    unit = unit.join("");
    unit = unit.toUpperCase() === "L" ? unit.toUpperCase() : unit.toLowerCase();
    const unitArray = ["L", "gal", "mi", "km", "lbs", "kg"];
    if (unitArray.indexOf(unit) === -1) return null;
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    const returnUnitMap = {
      L: "gal",
      gal: "L",
      km: "mi",
      mi: "km",
      lbs: "kg",
      kg: "lbs",
    };
    let result = returnUnitMap[initUnit];
    if (result === null) {
      return null;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    const spellOutUnitMap = {
      mi: "miles",
      km: "kilometers",
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
    };
    let result = spellOutUnitMap[unit] ? spellOutUnitMap[unit] : null;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === "gal" || initUnit === "L") {
      result = initUnit === "gal" ? initNum * galToL : initNum / galToL;
    } else if (initUnit === "lbs" || initUnit === "kg") {
      result = initUnit === "lbs" ? initNum * lbsToKg : initNum / lbsToKg;
    } else if (initUnit === "mi" || initUnit === "km") {
      result = initUnit === "mi" ? initNum * miToKm : initNum / miToKm;
    } else {
      result = null;
    }

    return result ? parseFloat(result.toFixed(5)) : null;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
  };
}

module.exports = ConvertHandler;
