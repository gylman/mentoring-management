const express = require("express");
const { getUser, signIn } = require("../controller/authController");

const router = express.Router();

router.route("/").get(getUser).post(signIn);

module.exports = router;
