import { TFlat } from '../../modules/flat/flat.interface';

export const modifyFlatData = (payload: Partial<TFlat>) => {
  payload.postStatus = 'pending';
  payload.availability = true;
  return payload as TFlat;
};
