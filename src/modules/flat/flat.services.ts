/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TFlat } from './flat.interface';
import { Flat } from './flat.model';
import { User } from '../user/user.model';

import { TUser } from '../user/user.interface';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../utils/jwtHelpers';
import { modifyFlatData } from '../../utils/modifyPayload';

const addFlatToDb = async ({
  flatData,
  userData,
}: {
  flatData: TFlat;
  userData: TUser;
}) => {
  let ownerId;
  let accessToken;

  // check if already user exits
  const phone = userData.phone;
  const existingUser = await User.findOne({ phone });

  if (!existingUser) {
    const createdUser = await User.create(userData);
    ownerId = createdUser.id;

    // jwt create access token for new registrated user
    const jwtPayload = {
      _id: createdUser._id,
      phone: createdUser.phone,
      name: createdUser.name,
    };

    accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: '10days',
    });
  } else {
    ownerId = existingUser.id;

    // jwt create access token for new registrated user
    const jwtPayload = {
      _id: existingUser._id,
      phone: existingUser.phone,
    };

    accessToken = jwtHelpers.generateJwtToken(
      jwtPayload,
      config.jwt_access_secret as Secret,
      '10days',
    );
  }
  // use utils function to add some extra data with flatData
  const modifiedFlatDta = modifyFlatData({ flatData, ownerId });

  const addedFlat = await Flat.create(modifiedFlatDta);

  return {
    addedFlat,
    accessToken,
  };
};

const getAllFlatsFromDb = async () => {
  const result = await Flat.find();

  return result;
};
const getFlatFromDbById = async (id: string) => {
  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  // Attempt to update the flat
  const flat = await Flat.findById({ _id: id }).populate('ownerId');

  // Check if a document was updated
  if (!flat) {
    throw new Error('Flat not found');
  }

  return flat;
};
const updateFlatIntoDbById = async (id: string, updateData: Partial<TFlat>) => {
  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  // Attempt to update the flat
  const updatedFlat = await Flat.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  // Check if a document was updated
  if (!updatedFlat) {
    throw new Error('Flat not found');
  }

  return updatedFlat;
};

const deleteFlatFromDbById = async (id: string) => {
  // Attempt to delete the flat
  const result = await Flat.findByIdAndDelete(id);

  // Check if a document was deleted or not found the document
  if (!result) {
    throw new Error('Flat not found');
  }
  return result;
};

export const flatServices = {
  addFlatToDb,
  getAllFlatsFromDb,
  deleteFlatFromDbById,
  updateFlatIntoDbById,
  getFlatFromDbById,
};
