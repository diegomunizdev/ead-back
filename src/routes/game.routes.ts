import { Router } from 'express'

// TODO: Adicionar o token na rota posteriormente
import { TokenValidation, TokenValidationAdmin, TokenValidationStudent, TokenValidationTeacher } from '../middlewares/token.validation'
import { createGame, getAll, getByPeriod, updateGame, deleteGame } from '../controllers/game.controller'

export const GameRoutes = (routes: Router) => {
  routes.post('/game', TokenValidationTeacher, createGame)
    .get('/games', TokenValidationAdmin, getAll)
    .get('/game/period/:period', TokenValidationStudent, getByPeriod)
    .patch('/game/:gameId/update', TokenValidationTeacher, updateGame)
    .delete('/game/:gameId/delete', TokenValidationTeacher, deleteGame)
}

/**
 * ### POST game
 * {
      "question": "Pergunta",
      "wrongAnswers": [], - Uma array com 4 respostas falsas
      "rightAnswers": "Resposta certa",
      "period": "", - valor de 1 até 10,
      "points": 0 - pontos da questão, de 1 até 10
    }
 *
 *
 */