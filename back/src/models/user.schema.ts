import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String,
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  careerQuizResult: { type: mongoose.Schema.Types.ObjectId, ref: 'CareerQuizResult' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now },
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
});

export default mongoose.model('User', userSchema);
