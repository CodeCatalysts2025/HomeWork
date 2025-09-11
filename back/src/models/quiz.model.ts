import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  question: String,
  options: [String],
  correctAnswer: String,
  xpValue: Number
});

export default mongoose.model('Quiz', quizSchema);
