import mongoose from 'mongoose';
import { User } from './user.model';
import { TUser } from './user.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserToDb = async (payload: TUser) => {
  const createdUser = await User.create(payload);

  // jwt create access token for new registrated user
  const jwtPayload = {
    _id: createdUser._id,
    phone: createdUser.phone,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10days',
  });
  const { name, phone } = createdUser;
  const user = { name, phone };

  // send response
  return {
    user,
    accessToken,
  };
};

const getAllUsersFromDb = async () => {
  const result = await User.find();

  return result;
};

const updateUserIntoDbById = async (id: string, updateData: Partial<TUser>) => {
  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  // Attempt to update the User
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  // Check if a document was updated
  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};

const deleteUserFromDbById = async (id: string) => {
  // Attempt to delete the User
  const result = await User.findByIdAndDelete(id);

  // Check if a document was deleted or not found the document
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

export const UserServices = {
  createUserToDb,
  getAllUsersFromDb,
  deleteUserFromDbById,
  updateUserIntoDbById,
};
