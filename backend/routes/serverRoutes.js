const express = require("express");
const {
  getServers,
  createServer,
  deleteServer,
} = require("../controller/serverController");

const router = express.Router();

router.route("/").get(getServers).post(createServer);

router.route("/:serverDbId").delete(deleteServer);

module.exports = router;
