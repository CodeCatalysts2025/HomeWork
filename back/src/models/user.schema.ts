import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    default: "No user name",
  },
});

export const User = model("User", userSchema);
