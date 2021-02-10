const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  serverName: {
    type: String,
  },
  ip: {
    type: String,
  },
  serverId: {
    type: String,
    required: [true, "ip is required"],
  },
  registered: {
    type: Boolean,
    default: false,
  },
  numOfUsers: {
    type: Number,
    default: 1,
  },
  rooms: [{ roomId: String, roomDivision: String }],
});

const Server = mongoose.model("Server", serverSchema);

module.exports = Server;
