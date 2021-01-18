const crypto = require("crypto");
const User = require("../models/UserModel");

exports.createUser = async function (req, res) {
  const password = crypto.randomBytes(4).toString("hex");

  console.log(password);

  const userObject = {
    userId: req.body.userId,
    password: password,
  };

  try {
    const user = await User.create(userObject);
    if (user) {
      res.status(200).json({ status: "success", data: user });
    }
  } catch (error) {}
};
