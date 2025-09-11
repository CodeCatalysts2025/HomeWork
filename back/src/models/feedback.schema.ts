import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comments: String,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
