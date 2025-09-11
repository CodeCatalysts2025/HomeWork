import mongoose from 'mongoose';

const careerQuizResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  personalityType: String,
  description: String,
  suggestedSubjects: [String],
  suggestedCareers: [String],
  takenAt: { type: Date, default: Date.now }
});

export default mongoose.model('CareerQuizResult', careerQuizResultSchema);
