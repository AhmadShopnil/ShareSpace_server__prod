// Define a custom user object type
export type TUserTwtPayload = {
  _id: string;
  phone: string;
  // Add any other properties your user object might have
};

// Extend the Express Request type to include the user property
export interface CustomRequest extends Request {
  user?: TUserTwtPayload;
}
