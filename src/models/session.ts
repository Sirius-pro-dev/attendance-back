import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: String,
  timeFrom: Date,
  timeTo: Date,
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  }
});

export default mongoose.model('Session', sessionSchema);
