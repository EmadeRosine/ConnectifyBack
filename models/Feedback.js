import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  satisfaction: {
    type: Number, // 1–5 (This maps to Android's ratingSatisfaction)
    required: true,
  },
  responsiveness: Number, // Consider removing if not collecting
  usability: Number,       // Consider removing if not collecting
  callReliability: Number, // Consider removing if not collecting
  dataSpeed: Number,       // This maps to Android's ratingSpeed
  comment: String,         // This maps to Android's etComments
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

// Add geospatial index
feedbackSchema.index({ location: '2dsphere' });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;