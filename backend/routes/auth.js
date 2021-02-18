const express = require("express");
const {
  getUser,
  signIn,
  forgetPassword,
  changepassword,
  protect,
} = require("../controller/authController");
const { updateEmail } = require("../controller/userController");

const router = express.Router();

router.route("/").get(getUser).post(signIn);
router.route("/forgetpassword").post(forgetPassword);
router.route("/update-email").post(protect, updateEmail);
router.route("/changepassword").post(protect, changepassword);

module.exports = router;
