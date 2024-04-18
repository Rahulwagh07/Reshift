import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ['Admin', 'Member'],
      default: 'Member',
    },
    token: {
      type: String,
    },
  });

interface User {
  name: string;
  email: string;
  password: string;
  accountType: 'Admin' | 'Member';
  token?: string;
}

// interface UserDocument extends User, Document {}

// const UserModel = mongoose.model<UserDocument>('User', userSchema);
const User = mongoose.models.User  ||  mongoose.model("User", userSchema);

export default User;
