import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupId: {
    type: String,
    default: uuidv4,
    unique: true
  }
});

export default mongoose.model('Group', groupSchema);
