import { Types } from 'mongoose';

export type TFlat = {
  //   id: Types.ObjectId;
  ownerId: Types.ObjectId;
  totalBedrooms: number;
  title: string;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  availability: boolean;
  postStatus: 'approved' | 'rejected' | 'pending';
};
