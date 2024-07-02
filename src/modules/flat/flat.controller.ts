import { Request, Response } from 'express';
import { flatServices } from './flat.services';

const addFlat = async (req: Request, res: Response) => {
  try {
    const { flatData } = req.body;

    const result = await flatServices.addFlatToDb(flatData);
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

export const flatController = {
  addFlat,
  getAllflats,
};
