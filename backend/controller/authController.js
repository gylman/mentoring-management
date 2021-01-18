const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");

exports.getUser = function (req, res) {
  res.status(200).json({ user: "Qilman", password: "12345678" });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if (req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }

  if (!token) {
    // return next(new AppError("authorization", 401));
    return res
      .status(401)
      .json({ status: "fail", msg: "You do not have token" });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  // if (!freshUser) {
  //   return next(new AppError("this user is not longer available", 401));
  // }
  if (!freshUser) {
    // return next(new AppError("authorization", 401));
    res
      .status(401)
      .json({ status: "fail", msg: "this user is not longer available" });
  }

  //grant access
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

exports.signIn = async function (req, res) {
  const userId = req.body.userId;
  const password = req.body.password;

  if (!userId || !password) {
    res
      .status(400)
      .json({ status: "fail", msg: "you should provide userId and password" });
  }

  const user = await User.findOne({ userId: userId });

  if (!user || !(await user.checkPassword(password, user.password))) {
    res
      .status(400)
      .json({ status: "fail", msg: "your userId or password is wrong" });
  }

  // if (user) {
  //   if (user.password === password) {
  //     res
  //       .status(200)
  //       .json({ status: "success", message: "You are successfully logged in" });
  //   } else {
  //     res.status(401).json({ status: "fail", message: "Login failed" });
  //   }
  // }

  createTokenAndSignIn(user, 200, res);
};
