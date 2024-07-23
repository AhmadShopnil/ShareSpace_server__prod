import { Types } from 'mongoose';

export type TFlat = {
  //   id: Types.ObjectId;
  ownerId: Types.ObjectId;
  totalBedrooms: number;
  totalBathrooms: number;
  title: string;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  availability: boolean;
  isDeleted?: boolean;
  postStatus: 'approved' | 'rejected' | 'pending';
  category: 'Flat' | 'Tin-Shade' | 'Tiner-ghor';
  images?: string[] | null;
};
