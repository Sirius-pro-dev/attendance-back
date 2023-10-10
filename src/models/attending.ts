import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const attendingSchema = new mongoose.Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joined_at: Date,
  attendingId: {
    type: String,
    default: uuidv4,
    unique: true
  }
});

export default mongoose.model('Attending', attendingSchema);
