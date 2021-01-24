const crypto = require("crypto");
const User = require("../models/UserModel");

exports.createUser = async function (req, res) {
  const password = crypto.randomBytes(4).toString("hex");

  const userInDB = await User.findOne({ userId: req.body.userId });

  // if (userInDB) {
  //   return res
  //     .status(400)
  //     .json({ status: "fail", message: "this user ID already exists" });
  // }

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
  } catch (error) {}
};
