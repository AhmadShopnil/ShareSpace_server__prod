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

export const flatServices = {
  addFlatToDb,
  getAllFlatsFromDb,
};
