import mongoose from 'mongoose';
import { TFlat } from './flat.interface';
import { Flat } from './flat.model';

const addFlatToDb = async (payload: TFlat) => {
  const result = await Flat.create(payload);
  return result;
};

const getAllFlatsFromDb = async () => {
  const result = await Flat.find();

  return result;
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
};
