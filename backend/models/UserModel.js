const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userID is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  name: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "type is required"],
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  address: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  return next();
});

userSchema.methods.checkPassword = async function (
  cadidatePassword,
  userPassword
) {
  return await bcrypt.compare(cadidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
