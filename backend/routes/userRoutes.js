const express = require("express");
const { protect } = require("../controller/authController");
const {
  createUser,
  getUsers,
  deleteUser,
  getMe,
} = require("../controller/userController");

const router = express.Router();

router.route("/").post(createUser).get(protect, getUsers);
router.route("/:userdbId").delete(deleteUser);
router.route("/profile").get(protect, getMe);

module.exports = router;
