import { Router } from 'express'

import { TokenValidation } from '../middlewares/token.validation'
import { createGame, getAll, getByPeriod, updateGame, deleteGame } from '../controllers/game.controller'

export const GameRoutes = (routes: Router) => {
    routes.post('/game', TokenValidation, createGame)
        .get('/game', TokenValidation, getAll)
        .get('/game/:period', TokenValidation, getByPeriod)
        .patch('/game/:gameId', TokenValidation, updateGame)
        .delete('/game/:gameId', TokenValidation, deleteGame)
}