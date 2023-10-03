import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export type UserType = Document & {
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
  password_hash?: string;
  password?: string;
  refreshToken: string | null;
  userId: mongoose.Types.ObjectId;
  comparePassword(password: string): Promise<boolean>;
};

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
  email: {
    type: String,
    unique: true,
    required: true
  },
  password_hash: {
    type: String
  },
  password: {
    type: String
  },
  refreshToken: {
    type: String,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password_hash = hashedPassword;
      this.password = null;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password_hash);
};

export default mongoose.model<UserType>('User', userSchema);
