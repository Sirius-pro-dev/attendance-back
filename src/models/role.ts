import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roleId: {
    type: String,
    default: uuidv4,
    unique: true
  }
});

export default mongoose.model('Role', roleSchema);
