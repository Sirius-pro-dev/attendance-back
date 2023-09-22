import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateTime: Date,
});

export default mongoose.model('Attendance', attendanceSchema);
