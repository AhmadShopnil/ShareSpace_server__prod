import { Schema, model } from 'mongoose';
import { TFlat } from './flat.interface';

const flatSchema = new Schema<TFlat>(
  {
    title: {
      type: String,
      require: true,
    },
    totalBedrooms: {
      type: Number,

      require: true,
    },
    location: {
      type: String,

      require: true,
    },
    description: {
      type: String,

      require: true,
    },
    rent: {
      type: Number,

      require: true,
    },
    advanceAmount: {
      type: Number,
      require: true,
    },
    availability: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Flat = model<TFlat>('Flat', flatSchema);
