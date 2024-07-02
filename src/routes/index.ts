import { Router } from 'express';
import { flatRoutes } from '../modules/flat/flat.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/courses',
    route: flatRoutes,
  },
];
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
