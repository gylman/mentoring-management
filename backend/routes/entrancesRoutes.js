const express = require("express");
const {
  getEntrances,
  getMonthlyEntrances,
} = require("../controller/entrancesController");

const router = express.Router();

router.route("/:userId").get(getEntrances);
router.route("/monthly/:userId").get(getMonthlyEntrances);


module.exports = router;
