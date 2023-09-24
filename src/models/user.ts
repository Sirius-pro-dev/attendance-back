import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  password_hash: {
    type: String
  },
  password: {
    type: String
  }
});

// нужно проверить
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password_hash = hashedPassword;
      user.password = null;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('User', userSchema);
