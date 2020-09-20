"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoutes = void 0;
// TODO: Adicionar o token na rota posteriormente
var token_validation_1 = require("../middlewares/token.validation");
var game_controller_1 = require("../controllers/game.controller");
exports.GameRoutes = function (routes) {
    routes.post('/game', token_validation_1.TokenValidationTeacher, game_controller_1.createGame)
        .get('/games', token_validation_1.TokenValidationAdmin, game_controller_1.getAll)
        .get('/game/period/:period', token_validation_1.TokenValidationStudent, game_controller_1.getByPeriod)
        .patch('/game/:gameId/update', token_validation_1.TokenValidationTeacher, game_controller_1.updateGame)
        .delete('/game/:gameId/delete', token_validation_1.TokenValidationTeacher, game_controller_1.deleteGame);
};
/**
 * ### POST game
 * {
      "question": "Pergunta",
      "options": [], - Uma array com 4 respostas falsas e 1 correta
      "rightAnswers": "Resposta certa",
      "period": "", - valor de 1 até 10,
      "points": 0 - pontos da questão, de 1 até 10
    }
 *
 *
 */ 
