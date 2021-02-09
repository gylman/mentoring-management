const mongoose = require("mongoose");

const entranceSchema = new mongoose.Schema({
  roomId: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  userId: {
    type: String,
  },
  mcuId: {
    type: String,
  },
  endTime: {
    type: Date,
  },
});

const Entrance = mongoose.model("Entrance", entranceSchema);

module.exports = Entrance;
