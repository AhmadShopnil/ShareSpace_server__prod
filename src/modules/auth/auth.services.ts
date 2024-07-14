/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

import config from '../../config';
import { createToken } from './auth.utils';

const login = async (payload: any) => {
  const isUserExist = await User.findOne({ phone: payload?.phone });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // const isPasswordMatch = await bcrypt.compare(
  //   payload?.phone,
  //   isUserExist?.password,
  // );

  // checking is password matched
  if (payload?.password !== isUserExist?.password) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client

  const jwtPayload = {
    _id: isUserExist._id,
    phone: isUserExist.phone,
    role: isUserExist?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const authServices = {
  login,
};
