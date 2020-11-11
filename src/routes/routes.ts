
import { Router } from 'express';
const routes: Router = Router();

import { AuthRoutes } from './auth.routes'
import { UserRoutes } from './user.routes'
import { GameRoutes } from './game.routes'
import { ForumRoutes } from './forum.routes'
import { ExerciseRoutes } from './exercise.routes'
import { SubjectsRoutes } from './subjects.routes'
import { ClassesRoutes } from './classes.routes'

AuthRoutes(routes)
UserRoutes(routes)
GameRoutes(routes)
ForumRoutes(routes)
ExerciseRoutes(routes)
SubjectsRoutes(routes)
ClassesRoutes(routes)

export default routes;