import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ['super-admin', 'user', 'manager', 'admin'],
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = model<TUser>('User', userSchema);
