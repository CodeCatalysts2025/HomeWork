import mongoose from 'mongoose';

const xpHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  source: { type: String, enum: ['quiz', 'feedback', 'lesson', 'admin'] },
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  relatedLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
});

export default mongoose.model('XPHistory', xpHistorySchema);
