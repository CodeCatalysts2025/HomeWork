import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: String,
  subject: String,
  difficulty: { type: Number, min: 1, max: 5 },
  xpReward: Number,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  learners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lesson', lessonSchema);
