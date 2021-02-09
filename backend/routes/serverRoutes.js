const express = require("express");
const {
  getServers,
  createServer,
  deleteServer,
  updateServer,
} = require("../controller/serverController");

const router = express.Router();

router.route("/").get(getServers).post(createServer);

router.route("/:serverDbId").delete(deleteServer);

router.route("/register-server").post(updateServer);

module.exports = router;
