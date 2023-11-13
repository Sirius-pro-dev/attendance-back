import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: String,
  timeFrom: Date,
  timeTo: Date,
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  meetingId: {
    type: String,
    default: uuidv4,
    unique: true
  }
});

export default mongoose.model('Meeting', meetingSchema);
