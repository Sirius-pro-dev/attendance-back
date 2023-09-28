import mongoose from 'mongoose';

const authenticationTokensSchema = new mongoose.Schema({
  token: String,
  expiration: Number,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('AuthenticationToken', authenticationTokensSchema);
