const express = require("express");
const {createConnection} = require("../controller/connectionController")
const router = express.Router();

router.route("/").post(createConnection);

module.exports = router;
