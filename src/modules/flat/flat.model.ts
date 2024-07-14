import { Schema, model } from 'mongoose';
import { TFlat } from './flat.interface';

const flatSchema = new Schema<TFlat>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Arefereace with  User model
    },
    title: {
      type: String,
      required: true,
    },
    totalBedrooms: {
      type: Number,
      required: true,
    },
    totalBathrooms: {
      type: Number,
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
    category: {
      type: String,
      enum: ['Flat', 'Tin-Shade', 'Tiner-ghor'],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Flat = model<TFlat>('Flat', flatSchema);
