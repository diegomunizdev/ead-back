
import { Router } from 'express';
const routes: Router = Router();

import { AuthRoutes } from './auth.routes'
import { UserRoute, UserRoutes } from './user.routes'
import { GameRoutes } from './game.routes'
import { ForumRoutes } from './forum.routes'
import { ExerciseRoutes } from './exercise.routes'
import { SubjectsRoutes } from './subjects.routes'

AuthRoutes(routes)
//UserRoutes(routes)
GameRoutes(routes)
ForumRoutes(routes)
ExerciseRoutes(routes)
SubjectsRoutes(routes)

export default routes;

export class RoutesTeste {
    constructor(
        private routes: Router,
        private readonly userRoutes: UserRoute
    ) { }

    public initRoutes() {
        this.userRoutes.userRoutes(this.routes)
    }
}