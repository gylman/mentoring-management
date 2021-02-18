const express = require("express");
const { protect } = require("../controller/authController");
const {
  getDivisions,
  createDivision,
  saveDivisions,
} = require("../controller/divisionsController");

const router = express.Router();

router.route("/").get(protect, getDivisions).post(createDivision);
router.route("/save").post(protect, saveDivisions);

module.exports = router;
