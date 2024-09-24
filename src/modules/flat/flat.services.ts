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
import QueryBuilder from '../../Builders/QueryBuilder';
import { flatSearchableFields } from './flat.constant';
import { TUserJwtPayload } from '../../interface';
import createJwtPayload from '../../utils/createJwtPayload';

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
  const phone = userData?.phone;
  // console.log(phone);

  const existingUser = await User.findOne({ phone });

  //if user already not exit create a user first
  if (!existingUser) {
    const createdUser = await User.create(userData);
    ownerId = createdUser.id;

    // jwt create access token for new registrated user
    const jwtPayload = createJwtPayload(createdUser);

    accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: '10days',
    });
  } else {
    // if user already exist just send token for login
    ownerId = existingUser?.id;

    // jwt create access token for loggedIn user
    const jwtPayload: TUserJwtPayload = createJwtPayload(existingUser);

    accessToken = jwtHelpers.generateJwtToken(
      jwtPayload,
      config.jwt_access_secret as Secret,
      '10days',
    );
  }
  // use utils function To add some extra data with flatData
  const modifiedFlatDta = modifyFlatData({ flatData, ownerId });

  const addedFlat = await Flat.create(modifiedFlatDta);

  return {
    addedFlat,
    accessToken,
  };
};

// const getAllFlatsFromDb = async (query: Record<string, unknown>) => {
//   const flatQuery = new QueryBuilder(Flat.find({ isDeleted: false }), query)
//     .search(flatSearchableFields)
//     .filter()
//     .rangeFilter()
//     .sort()
//     .paginate()
//     .fields();

//   const meta = await flatQuery.countTotal();
//   const flats = await flatQuery.modelQuery;

//   const result = await Flat.find();

//   return {
//     meta,
//     flats,
//   };
// };





const getFlatFromDbByUser = async (ownerId: string) => {
  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    throw new Error('Invalid ID format');
  }

  let query = {};
  if (ownerId) {
    query = { ownerId: ownerId, isDeleted: false };
  }

  // Attempt to update the flat
  const flat = await Flat.find(query).populate('ownerId');

  // Check if a document was updated
  if (!flat) {
    throw new Error('Not found any posted flat of this user');
  }

  return flat;
};
const getAllFlatsFromDb = async (query: Record<string, unknown>) => {
  const flatQuery = new QueryBuilder(Flat.find(), query)
    .search(flatSearchableFields)
    .filter()
    .rangeFilter()
    .sort()
    .paginate()
    .fields();

  const meta = await flatQuery.countTotal();
  // const result = await flatQuery.modelQuery;
  const flats = await flatQuery.modelQuery;

  return {
    meta,
    flats,
  };
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

// const deleteFlatFromDbById = async (id: string) => {
//   // Attempt to delete the flat
//   const result = await Flat.findByIdAndDelete(id);

//   // Check if a document was deleted or not found the document
//   if (!result) {
//     throw new Error('Flat not found');
//   }
//   return result;
// };

const deleteFlatFromDbById = async ({
  flatId,
  ownerId,
}: {
  flatId: string;
  ownerId: string;
}) => {
  // Find the flat by its ID
  const flat = await Flat.findById({ _id: flatId });

  // Check if the flat exists
  if (!flat) {
    throw new Error('No Flat found');
  }

  // Check if the ownerId matches

  if (flat?.ownerId.toString() !== ownerId) {
    throw new Error('Unauthorized: ownerId does not match');
  }

  // Attempt to soft delete the flat
  const result = await Flat.findByIdAndUpdate(
    { _id: flatId },
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  // Attempt to hard delete the flat
  // const result = await Flat.findByIdAndDelete({ _id: flatId });

  // Return the result of the deletion
  return result;
};

const updateFlatPostStatusintoDb = async (id: string, status: string) => {
  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  // Attempt to update the flat
  const updatedStatus = await Flat.findByIdAndUpdate(
    id,
    { postStatus: status },
    {
      new: true,
      runValidators: true,
    },
  );

  // Check if a document was updated
  if (!updatedStatus) {
    throw new Error('faild to update status');
  }

  return updatedStatus;
};

export const flatServices = {
  addFlatToDb,
  getAllFlatsFromDb,
  deleteFlatFromDbById,
  updateFlatIntoDbById,
  getFlatFromDbById,
  getFlatFromDbByUser,
  updateFlatPostStatusintoDb,
};
