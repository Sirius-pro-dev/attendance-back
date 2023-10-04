import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  }
});

export default mongoose.model('Role', roleSchema);
