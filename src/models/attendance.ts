import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  dateTime: Date,
});

module.exports = mongoose.model('Attendance', attendanceSchema);
