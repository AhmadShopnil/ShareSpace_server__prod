import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import * as fs from 'fs';

import config from '../config';
import { ICloudinaryResponse, IUploadFile } from '../interface/fileUpload';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadSingleFileToCloudinary = async (
  file: IUploadFile,
): Promise<ICloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

const uploadMultipleFilesToCloudinary = async (
  files: IUploadFile[],
): Promise<ICloudinaryResponse[]> => {
  const uploadPromises = files.map((file) =>
    uploadSingleFileToCloudinary(file),
  );
  const results = await Promise.allSettled(uploadPromises);

  return results
    .filter((result) => result.status === 'fulfilled')
    .map(
      (result) => (result as PromiseFulfilledResult<ICloudinaryResponse>).value,
    );
};

export const MultipleFileUploader = {
  uploadToCloudinary: uploadMultipleFilesToCloudinary,
  upload: upload.array('files', 10), // Adjust the field name and limit as needed
};
