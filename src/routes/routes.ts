
import { Router } from 'express';
const routes: Router = Router();

import { AuthRoutes } from './auth.routes'
import { UserRoutes } from './user.routes'
import { GameRoutes } from './game.routes'
import { ForumRoutes } from './forum.routes'
import { ExerciseRoutes } from './exercise.routes'

AuthRoutes(routes)
UserRoutes(routes)
GameRoutes(routes)
ForumRoutes(routes)
ExerciseRoutes(routes)

export default routes;