const express = require("express");
const { protect } = require("../controller/authController");
const {
  getServers,
  createServer,
  deleteServer,
  updateServer,
  updateServerName,
} = require("../controller/serverController");

const router = express.Router();

router.route("/").get(getServers).post(createServer);

router.route("/:serverDbId").delete(deleteServer);

router.route("/register-server").post(updateServer);
router.route("/update-server-name").post(protect, updateServerName);

module.exports = router;
