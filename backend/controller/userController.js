const crypto = require("crypto");
const User = require("../models/UserModel");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

exports.createUser = async function (req, res, next) {
  const password = crypto.randomBytes(4).toString("hex");

  if (req.body.userId === "" || req.body.email === "") {
    return next(
      new AppError(
        "Please make sure that all necesarry field are not empty",
        400
      )
    );
  }
  console.log("====================================");
  console.log(password);
  console.log("====================================");

  const userInDB = await User.findOne({ userId: req.body.userId });

  if (userInDB) {
    return next(new AppError("User ID already exists", 400));
  }

  const userObject = {
    userId: req.body.userId,
    name: req.body.name,
    division: req.body.division,
    status: req.body.status,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    password: password,
    createdBy: req.user ? req.user.userId : "not given",
    createdAt: Date.now(),
  };

  try {
    const user = await User.create(userObject);

    if (user) {
      await sendEmail({
        email: user.email,
        subject: "Your account details",
        message: `Hello dear ${user.name}. Your id:  ${user.userId}, your password: ${password}`,
      });

      res.status(200).json({ status: "success", data: user });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = async function (req, res) {
  let filter = {};

  if (req.user.status === "manager") {
    filter.division = req.user.division;
    filter.status = { $ne: "administrator" };
  }
  if (req.user.status === "instructor") {
    // filter = { $or: [{ status: "student" }, {  }] };
    filter.division = req.user.division;
    filter.createdBy = req.user.userId;
    filter.$nor = [
      { status: "administrator" },
      { status: "manager" },
      { status: "instructor" },
    ];
  }
  if (req.user.status === "student") {
    filter = { status: "student", userId: req.user.userId };
  }

  let users = await User.find(filter).sort({ createdAt: -1 });

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

exports.getMe = async (req, res, next) => {
  let user;

  try {
    user = await User.findOne({ userId: req.user.userId });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    status: "success",
    user: user,
  });
};
