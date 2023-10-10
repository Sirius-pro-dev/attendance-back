import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: String,
  timeFrom: Date,
  timeTo: Date,
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  meetingId: {
    type: String,
    default: uuidv4,
    unique: true
  }
});

export default mongoose.model('Meeting', meetingSchema);
