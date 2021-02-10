
const Entrance = require("../models/EntranceModel");

exports.getEntrances = async function (req, res) {
  let entrances;

  if (req.query.date) {
    entrances = await Entrance.find({
      userId: req.params.userId,
      startTime: {
        $gte: new Date(req.query.date),
        $lt: new Date(new Date(req.query.date).getTime() + 24 * 60 * 60 * 1000),
      },
    });
  }

  res.status(200).json({
    status: "success",
    entrances,
  });
};
exports.getMonthlyEntrances = async function (req, res) {
  let entrances;
  const date = new Date(req.query.date);

  entrances = await Entrance.aggregate([
    {
      $match: {
        startTime: {
          $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          $lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        },
        userId: req.params.userId,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    entrances,
  });
};
