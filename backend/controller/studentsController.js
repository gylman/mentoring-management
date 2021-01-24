const crypto = require("crypto");
const User = require("../models/UserModel");

exports.getStudent = async function (req, res) {
  res.status(200).json({
    name: "Qilman",
  });
};
