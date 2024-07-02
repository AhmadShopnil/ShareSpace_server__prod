import { Schema, model } from 'mongoose';
import { TFlat } from './flat.interface';

const flatSchema = new Schema<TFlat>(
  {
    title: {
      type: String,
      required: true,
    },
    totalBedrooms: {
      type: Number,
      unique: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    advanceAmount: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    postStatus: {
      type: String,
      enum: ['approved', 'rejected', 'pending'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Flat = model<TFlat>('Flat', flatSchema);
