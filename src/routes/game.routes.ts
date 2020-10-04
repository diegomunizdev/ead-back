import { Router } from 'express'

import { TokenValidationAdmin, TokenValidationStudent, TokenValidationTeacher } from '../middlewares/token.validation'
import { createGame, getAll, getByPeriod, updateGame, deleteGame } from '../controllers/game.controller'

export const GameRoutes = (routes: Router) => {
  routes.post('/game', TokenValidationTeacher, createGame)
    .get('/games', TokenValidationAdmin, getAll)
    .get('/game/period/:period', TokenValidationStudent, getByPeriod)
    .patch('/game/:gameId/update', TokenValidationTeacher, updateGame)
    .delete('/game/:gameId/delete', TokenValidationTeacher, deleteGame)
}