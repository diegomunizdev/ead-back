import { Request, Response } from 'express'
import Game, { IGame } from '../models/game.model'

export const createGame = async (req: Request, res: Response): Promise<void> => {
    try {
        const game: IGame = new Game(req.body)
        if (!game) res.status(401).json({
            code: 401,
            message: 'Não foi possível criar a pergunta e as respostas',
            description: ''
        })

        await game.save()

        res.status(201).json({
            code: 201,
            message: 'Perguntas e respostas criadas com sucesso'
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}


export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const games = await Game.find()
        if (!games) res.status(400).json({
            code: 400,
            message: 'Não foi possível encontrar as perguntas e respostas',
            description: ''
        })

        res.status(200).json({
            code: 200,
            data: games
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getByPeriod = async (req: Request, res: Response): Promise<void> => {
    try {
        const game = await Game.find({ period: req.params.period })

        if (!game) res.status(400).json({
            code: 400,
            message: 'Não foi possível mostrar os dados desse período'
        })

        res.status(200).json({
            code: 200,
            data: game
        })

    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}


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
            wrongAnswers: req.body.wrongAnswers,
            period: req.body.period,
            points: req.body.points
        }

        await Game.findByIdAndUpdate(game, {
            $set: updateGame
        }, { new: true })

        res.status(200).json({
            code: 200,
            message: 'Dados da questão atualizado com sucesso'
        })
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