import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});

module.exports = mongoose.model('Teacher', teacherSchema);
