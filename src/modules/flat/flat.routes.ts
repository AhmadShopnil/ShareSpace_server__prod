import { Router } from 'express';

import { flatController } from './flat.controller';
import { FileUploader } from '../../helpers/fileUploader';

const router = Router();

router.post('/add', FileUploader.upload.single('file'), flatController.addFlat);
router.get('/:flatId', flatController.getSingleFlatById);
router.delete('/:flatId', flatController.deleteFlatById);
router.put('/:flatId', flatController.updateFlatById);
router.get('/', flatController.getAllflats);

export const flatRoutes = router;
