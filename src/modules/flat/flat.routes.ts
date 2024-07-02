import { Router } from 'express';
import { flatController } from './flat.controller';

const router = Router();

router.post('/add', flatController.addFlat);
router.delete('/:flatId', flatController.deleteFlatById);
router.put('/:flatId', flatController.updateFlatById);
router.get('/', flatController.getAllflats);

export const flatRoutes = router;
