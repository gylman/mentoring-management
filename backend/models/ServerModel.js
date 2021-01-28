const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "server name is required"],
  },
  ip: {
    type: String,
    required: [true, "ip is required"],
  },
});

const Server = mongoose.model("Server", serverSchema);

module.exports = Server;
