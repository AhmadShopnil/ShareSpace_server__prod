import { Router } from 'express';
import { flatController } from './flat.controller';

const router = Router();

router.post('/add', flatController.addFlat);
router.get('/', flatController.getAllflats);

export const flatRoutes = router;
