import { Request, Response } from 'express'
import Exercise, { IExercise } from '../models/exercise.model'

export const createExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise: IExercise = new Exercise({
            file: req.file.filename,
            description: req.body.description,
            delivery: req.body.delivery,
            urlVideo: req.body.urlVideo
        })
        if (!exercise) res.status(401).json({
            code: 401,
            message: 'Não foi possível salvar a imagem',
            description: ''
        })

        await exercise.save()

        res.status(201).json(exercise)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}