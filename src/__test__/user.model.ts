import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { collection: 'users' }
);

export const UserModel = mongoose.model('users', UserSchema, 'users');
