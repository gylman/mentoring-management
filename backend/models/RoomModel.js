const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "division name is required"],
  },
});

const Division = mongoose.model("Division", divisionSchema);

module.exports = Division;
