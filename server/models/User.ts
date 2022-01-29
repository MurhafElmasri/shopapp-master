import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

interface UserType {
  username: string;
  email: string;
  password: string;
}

export const User = mongoose.model<UserType>("User", UserSchema);
