const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    userName: String,
    email: String,
    password: String,
    avatar: String,
    bio: String,
    site: String,
    telefone: Number,
    gender : String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
