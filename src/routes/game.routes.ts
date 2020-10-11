import { Router } from 'express'

import { TokenValidationAdmin, TokenValidationStudent, TokenValidationTeacher } from '../middlewares/token.validation'
import { createGame, getAll, getByPeriod, updateGame, deleteGame, getQuestion } from '../controllers/game.controller'

// TODO: Inserir os token's de permissões dos usuários
export const GameRoutes = (routes: Router) => {
  routes.post('/game', TokenValidationTeacher, createGame)
    .get('/games', getAll)
    .get('/game/period/:period', TokenValidationStudent, getByPeriod)
    .patch('/game/:gameId/update', updateGame)
    .delete('/game/:gameId/delete', TokenValidationTeacher, deleteGame)
}