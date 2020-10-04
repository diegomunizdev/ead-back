import { Request, Response } from 'express'
import Game, { IGame } from '../models/game.model'
import { PaginationData, PaginationDataPeriod } from '../shared/pagination.shared'

export const createGame = async (req: Request, res: Response): Promise<void> => {
    try {
        const game: IGame = new Game(req.body)
        if (!game) res.status(401).json({
            code: 401,
            message: 'Não foi possível criar a pergunta e as respostas',
            description: ''
        })

        await game.save()
        res.status(201).json(game)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getAll = PaginationData(Game)

export const getByPeriod = PaginationDataPeriod(Game)

export const updateGame = async (req: Request, res: Response): Promise<void> => {
    try {
        const game = await Game.findById(req.params.gameId)

        if (!game) res.status(400).json({
            code: 400,
            message: 'Jogo não encontrado'
        })

        const updateGame = {
            question: req.body.question,
            rightAnswers: req.body.rightAnswers,
            options: req.body.options,
            answered: req.body.answered,
            period: req.body.period,
            points: req.body.points
        }

        await Game.findByIdAndUpdate(game, {
            $set: updateGame
        }, { new: true })

        res.status(200).json(updateGame)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}


export const deleteGame = async (req: Request, res: Response): Promise<void> => {
    try {
        const game = await Game.findByIdAndRemove(req.params.gameId)

        if (!game) res.status(400).json({
            code: 400,
            message: 'Não foi possível encontrar o jogo'
        })
        res.status(200).json({
            code: 200,
            message: 'Excluído com sucesso'
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}