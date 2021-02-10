const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: [true, "roomId is required"],
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  mcuId: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  users: ["String"],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
