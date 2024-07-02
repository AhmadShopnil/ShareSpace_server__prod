import { Request, Response } from 'express';
import { flatServices } from './flat.services';

const addFlat = (req: Request, res: Response) => {
  try {
    const result = flatServices.addFlatToDb();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Flat aded successfully ',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const flatController = {
  addFlat,
};
