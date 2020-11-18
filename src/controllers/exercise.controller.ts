import { Request, Response } from 'express'
import Exercise, { IExercise } from '../models/schemas/exercise.model'
import { PaginationData } from '../shared/pagination.shared'

export const createExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise: IExercise = new Exercise({
            ...req.body,
            file: `${process.env.APP_URL}/ead/files/${req.file.filename}`,
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

// TODO: criar a páginação por cadeira (disciplina)
export const getAll = PaginationData(Exercise)

export const updateExercise = async (req: Request, res: Response): Promise<void> => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId)
        if (!exercise) res.status(400).json({
            code: 400,
            message: 'Não foi possível mostrar o exerício',
            description: ''
        })

        const updateExercise = {
            file: req.file.filename ? `${process.env.APP_URL}/ead/files/${req.file.filename}` : '',
            title: req.body.title,
            description: req.body.description,
            delivery: req.body.delivery,
            urlVideo: req.body.urlVideo
        }
        await Exercise.findByIdAndUpdate(exercise, {
            $set: updateExercise
        }, { new: true })

        res.status(200).json(updateExercise)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findByIdAndRemove(req.params.exerciseId)

        if (!exercise) res.status(400).json({
            code: 400,
            message: 'Exercício não encontrado',
            description: 'Não foi possível deletar o exercício'
        })

        res.status(200).json({
            code: 200,
            message: 'Exercício removido com sucesso',
            description: ''
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}