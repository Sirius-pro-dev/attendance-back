import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});

module.exports = mongoose.model('Student', studentSchema);
