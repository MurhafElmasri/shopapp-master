import mongoose from "mongoose";
const { isEmail } = require("validator")


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, validate: isEmail },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

interface UserType {
  username: string;
  email: string;
  password: string;
}

export const User = mongoose.model<UserType>("User", UserSchema);
