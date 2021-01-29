const express = require("express");
const {
  getUser,
  signIn,
  forgetPassword,
  changepassword,
  protect,
} = require("../controller/authController");

const router = express.Router();

router.route("/").get(getUser).post(signIn);
router.route("/forgetpassword").post(forgetPassword);
router.route("/changepassword").post(protect, changepassword);

module.exports = router;
