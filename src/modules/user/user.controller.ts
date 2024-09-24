import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const result = await UserServices?.createUserToDb(req.body);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User Registered successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  registerUser,
};
