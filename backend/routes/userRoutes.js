const express = require("express");
const {
  createUser,
  getUsers,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.route("/").post(createUser).get(getUsers);
router.route("/:userdbId").delete(deleteUser);

module.exports = router;
