import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cartItems: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
