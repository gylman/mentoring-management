const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const AppError = require("../utils/appError");

exports.getUser = function (req, res) {
  res.status(200).json({ user: "Qilman", password: "12345678" });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};
exports.forgetPassword = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("User email does not exist", 400));
  }
  const newPassword = crypto.randomBytes(4).toString("hex");
  console.log("====================================");
  console.log(`${user.name} reset his/or her password, new password: ${newPassword}, userID:  ${user.userId}`);
  console.log("====================================");
  user.password = newPassword;

  await user.save();

  try {
    await sendEmail({
      email: user.email,
      subject: "Password / User ID Reset",
      message: `Hello dear ${user.name}. It seems you requested to reset your password or user ID. We reset it for you, your id is: ${user.userId}, your password: ${newPassword}`,
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ status: "success" });
};
exports.changepassword = async function (req, res, next) {
  const user = await User.findOne({ userId: req.user.userId });

  if (
    !user ||
    !(await user.checkPassword(req.body.currentPassword, user.password))
  ) {
    return next(new AppError("Your current password is not correct", 400));
  }

  if (req.body.newPassword !== req.body.newPassword2) {
    return next(
      new AppError(
        "Please check new password and second new password are the same ",
        400
      )
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You do not have token", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError("this user is not longer available", 401));
  }

  req.user = freshUser;
  res.locals.user = freshUser; /* we also need this one in get me page */
  next();
};

const createTokenAndSignIn = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.cookie();

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signIn = async function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  let user;

  if (!userId || !password) {
    return next(new AppError("you should provide userId and password", 400));
  }

  try {
    user = await User.findOne({ userId: userId });
  } catch (error) {
    console.log(error);
  }

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("you should provide userId and password", 400));
  }

  createTokenAndSignIn(user, 200, res);
};
