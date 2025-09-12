import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  difficulty: { type: Number, min: 1, max: 5, default: 1 },
  xpReward: { type: Number, default: 50 },

  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },

  learners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],

  status: {
    type: String,
    enum: ["pending_approval", "approved", "rejected"],
    default: "pending_approval",
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Lesson", lessonSchema);
