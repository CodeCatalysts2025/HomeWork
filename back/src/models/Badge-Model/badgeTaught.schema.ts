import mongoose from "mongoose";

const badgeTaught = new mongoose.Schema({
  name: String,
  description: String,
  iconUrl: String,
  category: String,
  unlockCriteria: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("BadgeTaught", badgeTaught);
