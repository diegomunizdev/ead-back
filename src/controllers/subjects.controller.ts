import { Request, Response } from 'express'
import Subject, { ISubjects } from '../models/schemas/subjects.model'
import { PaginationData, PaginationDataPeriod } from '../shared/pagination.shared'

export const createSubject = async (req: Request, res: Response): Promise<void> => {
    try {
        const subject: ISubjects = new Subject(req.body)
        if (!subject) res.status(401).json({
            code: 401,
            message: 'Não foi possível criar a disciplina',
            description: ''
        })

        await subject.save()
        res.status(201).json(subject)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getAll = PaginationData(Subject)
export const getByPeriod = PaginationDataPeriod(Subject)

export const getByTeacher = async (req: Request, res: Response): Promise<void> => {
    try {
        const subjects = await Subject.find({ teacherId: req.params.teacherId })

        if (!subjects) res.status(400).json({
            code: 400,
            message: 'Nenhuma disciplina encontrada',
            description: ''
        })

        res.status(200).json(subjects)
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const subject = await Subject.findById(req.params.subjectId)

        if (!subject) res.status(401).json({
            code: 401,
            message: 'Disciplina não encontrada',
            description: ''
        })

        res.status(200).json(subject)
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

export const updateSubject = async (req: Request, res: Response): Promise<void> => {
    try {
        const subjectId = await Subject.findById(req.params.subjectId)
        if (!subjectId) res.status(400).json({
            code: 400,
            message: 'Não foi possível mostrar os dados da disciplina',
            description: ''
        })

        const updateSubject = {
            name: req.body.name,
            shift: req.body.shift,
            schedule: req.body.schudule,
            period: req.body.period,
            teacherId: req.body.teacherId,
            listStudent: req.body.listStudent
        }

        await Subject.findByIdAndUpdate(subjectId, {
            $set: updateSubject
        }, { new: true })

        res.json(200).json(updateSubject)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const deleteSubject = async (req: Request, res: Response): Promise<void> => {
    try {
        const subject = await Subject.findByIdAndRemove(req.params.subjectId)

        if (!subject) res.status(400).json({
            code: 400,
            message: 'Disciplina não encontrada',
            description: 'Não foi possível remover a disciplina'
        })

        res.status(200).json({
            code: 200,
            message: 'Disciplina removida com sucesso'
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}