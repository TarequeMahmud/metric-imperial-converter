function ConvertHandler() {
  this.getNum = function (input) {
    let fractionRegex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/; // Captures decimals and fractions
    let result = input.match(fractionRegex)[0];

    if (!result) {
      result = 1;
    }

    // Handle fractions like "2/3"
    if (result.includes("/")) {
      let values = result.split("/");
      result = Number(values[0]) / Number(values[1]);
    }

    return Number(result);
  };

  this.getUnit = function (input) {
    let unit = input.match(/[a-zA-Z]+/g);
    if (unit === null) {
      return null;
    }
    unit = unit.join("");
    unit = unit.toUpperCase() === "L" ? unit.toUpperCase() : unit.toLowerCase();
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
      gal: "gallon",
      L: "litre",
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

    if (initUnit === "gal" || initUnit === "l") {
      result = "gal" ? initNum * galToL : initNum / galToL;
    } else if (initUnit === "lbs" || initUnit === "kg") {
      result = "lbs" ? initNum * lbsToKg : initNum / lbsToKg;
    } else if (initUnit === "mi" || initUnit === "km") {
      result = "mi" ? initNum * miToKm : initNum / miToKm;
    } else {
      result = null;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
  };
}

module.exports = ConvertHandler;
