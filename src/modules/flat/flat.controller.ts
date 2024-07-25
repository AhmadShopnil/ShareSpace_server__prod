/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { flatServices } from './flat.services';

const addFlat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { flatData, userData } = req.body;

    const result = await flatServices.addFlatToDb({
      flatData,
      userData,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat added successfully ',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    next(error);
  }
};

const getAllflats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await flatServices.getAllFlatsFromDb(req.query);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Get All Flats successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getFlatByUserId = async (req: any, res: Response, next: NextFunction) => {
  try {
    const ownerId = req?.user?._id as string;

    const result = await flatServices.getFlatFromDbByUser(ownerId);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Get Flat  successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleFlatById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { flatId } = req.params;

    const result = await flatServices.getFlatFromDbById(flatId);
    // console.log('from controller', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Get Flat  successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteFlatById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { flatId } = req.params;
    const ownerId = req?.user?._id as string;

    const result = await flatServices.deleteFlatFromDbById({ flatId, ownerId });
    // console.log('from controller', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat deleted successfully ',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateFlatById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { flatId } = req.params;
    const { updatedData } = req.body;

    const result = await flatServices.updateFlatIntoDbById(flatId, updatedData);
    // console.log('from controller', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat data updated successfully ',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const updateFlatPostStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { flatId } = req.params;
    const { status } = req.body;

    const result = await flatServices.updateFlatIntoDbById(flatId, status);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat Post Status updated successfully ',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
export const flatController = {
  addFlat,
  getAllflats,
  deleteFlatById,
  updateFlatById,
  getSingleFlatById,
  getFlatByUserId,
  updateFlatPostStatus,
};
