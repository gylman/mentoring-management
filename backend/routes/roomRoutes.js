const express = require("express");
const { getRooms } = require("../controller/roomController");

const router = express.Router();



router.route("/:serverId").get(getRooms);



module.exports = router;
