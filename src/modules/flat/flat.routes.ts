import { Router } from 'express';

import { flatController } from './flat.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/add',
  //   FileUploader.upload.single('file'),
  // MultipleFileUploader.upload,
  flatController.addFlat,
);
router.get('/myPostedHouse', auth(), flatController.getFlatByUserId);
router.get('/:flatId', flatController.getSingleFlatById);
router.delete('/:flatId', auth(), flatController.deleteFlatById);
router.put('/:flatId', auth(), flatController.updateFlatById);

router.get('/', flatController.getAllflats);

export const flatRoutes = router;
