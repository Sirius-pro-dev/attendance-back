import mongoose from 'mongoose';

const attendingSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joined_at: Date,
  attendingId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  }
});

export default mongoose.model('Attending', attendingSchema);
