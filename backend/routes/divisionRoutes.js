const express = require("express");
const {
  getDivisions,
  createDivision,
  saveDivisions,
} = require("../controller/divisionsController");

const router = express.Router();

router.route("/").get(getDivisions).post(createDivision);
router.route("/save").post(saveDivisions);

module.exports = router;
