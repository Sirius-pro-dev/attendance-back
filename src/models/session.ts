import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: String,
  time_from: Date,
  time_to: Date,
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
});

module.exports = mongoose.model('Session', sessionSchema);
