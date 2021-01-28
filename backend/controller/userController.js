const crypto = require("crypto");
const User = require("../models/UserModel");
const AppError = require("../utils/appError");

exports.createUser = async function (req, res, next) {
  const password = crypto.randomBytes(4).toString("hex");

  const userInDB = await User.findOne({ userId: req.body.userId });

  if (userInDB) {
    return next(new AppError("User ID already exists", 400));
  }

  const userObject = {
    userId: req.body.userId,
    name: req.body.name,
    division: req.body.division,
    type: req.body.type,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    password: password,
  };
  console.log(password);
  try {
    const user = await User.create(userObject);
    if (user) {
      res.status(200).json({ status: "success", data: user });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async function (req, res) {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    users: users,
  });
};

exports.deleteUser = async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.userdbId);
  } catch (error) {
    console.log(error);
  }

  res.status(204).json({
    status: "success",
    user: null,
  });
};
