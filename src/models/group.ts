import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  }
});

export default mongoose.model('Group', groupSchema);
