/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../utils/jwtHelpers';
import config from '../config';
// import ApiError from '../errors/ApiError';
import { TUserTwtPayload } from '../interface';

const auth = () => async (req: any, res: Response, next: NextFunction) => {
  try {
    // Get authorization token
    const token = req.headers.authorization as string;

    // console.log(token);

    if (!token) {
      res.status(500).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You are not authorised user ',
        // data: result,
      });
      // throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Verify token
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt_access_secret as Secret,
    ) as TUserTwtPayload;

    req.user = verifiedUser;

    // Role guard verify
    //   if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
    //     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    //   }

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
