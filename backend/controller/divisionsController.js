
const Division = require("../models/DivisionModel");

exports.getDivisions = async function (req, res) {
  const divisions = await Division.find();

  res.status(200).json({
    status: "success",
    divisions: divisions,
  });
};

exports.createDivision = async function (req, res) {
  const name = req.body.name;
  const division = await Division.create({ name });

  res.status(200).json({
    status: "success",
  });
};

exports.saveDivisions = async function (req, res) {
  const divisions = req.body.divisions;

  const existedDivisions = await Division.find();

  const existedDivisionsInStrings = existedDivisions.map(
    (division) => division.name
  );
  divisions.map(async (division) => {
    if (existedDivisionsInStrings.includes(division)) {
      return;
    } else {
      await Division.create({ name: division });
    }
  });

  existedDivisionsInStrings.map(async (item) => {
    if (divisions.includes(item)) {
      return;
    } else {
      await Division.deleteOne({ name: item });
    }
  });

  res.status(200).json({
    status: "success",
  });
};
