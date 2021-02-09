const crypto = require("crypto");
const Room = require("../models/RoomModel");

exports.getRooms = async function (req, res) {
  const rooms = await Room.find({ mcuId: req.params.serverId });

  res.status(200).json({
    status: "success",
    rooms,
  });
};
