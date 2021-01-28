const express = require("express");
const {
  getUser,
  signIn,
  forgetPassword,
} = require("../controller/authController");

const router = express.Router();

router.route("/").get(getUser).post(signIn);
router.route("/forgetpassword").post(forgetPassword);

module.exports = router;
