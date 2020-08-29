
import { Router } from 'express';
const routes: Router = Router();

import { AuthRoutes } from './auth.routes'
import { UserRoutes } from './user.routes'

AuthRoutes(routes)
UserRoutes(routes)

export default routes;