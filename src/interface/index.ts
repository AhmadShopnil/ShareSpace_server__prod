import { Types } from 'mongoose';

// Define a custom user object type
export type TUserJwtPayload = {
  _id: Types.ObjectId;
  role: string;
  phone: string;
  name: string;
  // Add any other properties your user object might have
};

// Extend the Express Request type to include the user property
export interface CustomRequest extends Request {
  user?: TUserJwtPayload;
}

export type TLoginUserPayload = {
  phone: string;
  password: string;
};
