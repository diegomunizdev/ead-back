import { Request, Response } from 'express'
import Classes, { IClasses } from '../models/schemas/classes.model'

export const createClasses = async (req: Request, res: Response): Promise<void> => {
    try {
        const classes: IClasses = new Classes(req.body)

        if (!classes) res.status(401).json({
            code: 401,
            message: 'Não foi possível registrar a aula',
            description: ''
        })

        await classes.save()

        res.status(201).json(classes)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getBySubjectId = async (req: Request, res: Response): Promise<void> => {
    try {
        const classesBySubjects = await Classes.find({ subjectId: req.params.subjectId })

        if (!classesBySubjects) res.status(401).json({
            code: 401,
            message: 'Registro de aulas não encontrados',
            description: ''
        })

        res.status(200).json(classesBySubjects)
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

export const updateClasses = async (req: Request, res: Response): Promise<void> => {
    try {
        const classesId = await Classes.findById({ id: req.params.classesId })

        if (!classesId) res.status(400).json({
            code: 400,
            message: 'Não foi possível recuperar a disciplina',
            description: ''
        })

        const updateClasses = {
            record: req.body.record,
            date: req.body.date
        }

        await Classes.findByIdAndUpdate(classesId, {
            $set: updateClasses
        }, { new: true })

    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

export const deleteClasses = async (req: Request, res: Response): Promise<void> => {
    try {
        const classe = await Classes.findByIdAndRemove(req.params.classesId)
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}