import mongoose from "mongoose";

const badgeLearned = new mongoose.Schema({
  name: String,
  description: String,
  iconUrl: String,
  category: String,
  unlockCriteria: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("BadgeTaught", badgeLearned);
