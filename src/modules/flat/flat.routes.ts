import { Router } from 'express';
import { flatController } from './flat.controller';

const router = Router();

router.post('/', flatController.addFlat);

export const flatRoutes = router;
