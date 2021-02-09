const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: [true, "roomId is required"],
  },
  startTime: {
    type: String,
    // required: [true, "startTime name is required"],
  },
  endTime: {
    type: String,
    // required: [true, "endTime name is required"],
  },
  mcuId: {
    type: String,
    // required: [true, "endTime name is required"],
  },
  startTime: {
    type: Date,
    // required: [true, "endTime name is required"],
  },
  users: ["String"],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
