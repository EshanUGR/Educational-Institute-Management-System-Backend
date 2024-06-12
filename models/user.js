import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String, required: true },
    nic: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
