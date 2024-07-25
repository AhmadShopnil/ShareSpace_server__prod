import { Router } from 'express';
import { flatRoutes } from '../modules/flat/flat.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/flats',
    route: flatRoutes,
  },
  { path: '/login', route: authRoutes },
  { path: '/user', route: userRoutes },
];
// moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
