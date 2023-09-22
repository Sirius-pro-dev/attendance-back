import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Role', roleSchema);
