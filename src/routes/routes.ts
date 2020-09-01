
import { Router } from 'express';
const routes: Router = Router();

import { AuthRoutes } from './auth.routes'
import { UserRoutes } from './user.routes'
import { GameRoutes } from './game.routes'

AuthRoutes(routes)
UserRoutes(routes)
GameRoutes(routes)

export default routes;