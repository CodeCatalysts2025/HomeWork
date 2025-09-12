import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  role: { type: String, enum: ["student", "admin"], default: "student" },
});

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permissions: {
    canManageUsers: { type: Boolean, default: false },
    canReviewLessons: { type: Boolean, default: false },
    canViewReports: { type: Boolean, default: false },
    canGrantBadges: { type: Boolean, default: false },
  },
});

export default mongoose.model("Admin", adminSchema);
