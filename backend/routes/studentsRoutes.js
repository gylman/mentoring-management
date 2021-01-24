const express = require("express");
const { protect } = require("../controller/authController");
const { getStudent } = require("../controller/studentsController");

const router = express.Router();

router.route("/").get(protect, getStudent);

module.exports = router;
