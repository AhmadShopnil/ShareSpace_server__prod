/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { flatServices } from './flat.services';
import { modifyFlatData } from '../../utils/modifyPayload/modifyPayload';

const addFlat = async (req: Request, res: Response) => {
  try {
    const { flatData } = req.body;

    // use utils function to add some extra data with flatData
    const modifiedFlatDta = modifyFlatData(flatData);

    const result = await flatServices.addFlatToDb(modifiedFlatDta);
    // console.log('from controller', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat added successfully ',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const getAllflats = async (req: Request, res: Response) => {
  try {
    const result = await flatServices.getAllFlatsFromDb();
    // console.log('from controller', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Get All Flats successfully ',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const deleteFlatById = async (req: Request, res: Response) => {
  try {
    const { flatId } = req.params;

    const result = await flatServices.deleteFlatFromDbById(flatId);
    // console.log('from controller', result);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat deleted successfully ',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
const updateFlatById = async (req: Request, res: Response) => {
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
    // eslint-disable-next-line no-console
    console.log(error);
    res.status(201).json({
      success: false,
      statusCode: 400,
      message: error?.message,
      error: error,
    });
  }
};
export const flatController = {
  addFlat,
  getAllflats,
  deleteFlatById,
  updateFlatById,
};
