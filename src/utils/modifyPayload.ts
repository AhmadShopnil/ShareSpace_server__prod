/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { TFlat } from '../modules/flat/flat.interface';

export const modifyFlatData = ({
  flatData,
  ownerId,
}: {
  flatData: TFlat;
  ownerId: Types.ObjectId;
}) => {
  flatData.postStatus = 'pending';
  flatData.availability = true;
  flatData.isDeleted = false;
  flatData.ownerId = ownerId;
  return flatData as TFlat;
};
