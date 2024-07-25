/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUserJwtPayload } from '../interface';

const createJwtPayload = (data: any): TUserJwtPayload => {
  return {
    _id: data._id,
    phone: data.phone,
    name: data.name,
    role: data?.role,
  };
};

export default createJwtPayload;
