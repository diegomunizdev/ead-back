import { Request, Response } from 'express'
import Forum, { IForum } from '../models/schemas/forum.model'
import { PaginationData } from '../shared/pagination.shared'

export const createForum = async (req: Request, res: Response): Promise<void> => {
    try {
        const forum: IForum = new Forum(req.body)
        if (!forum) res.status(401).json({
            code: 401,
            message: 'Não foi possível criar o assunto no fórum',
            description: ''
        })

        await forum.save()

        res.status(201).json(forum)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getAll = PaginationData(Forum)

export const forumById = async (req: Request, res: Response): Promise<void> => {
    try {
        const forumId = await Forum.findById(req.params.forumId)

        if (!forumId) res.status(400).json({
            code: 400,
            message: 'Não foi possível recuperar os dados'
        })

        res.status(200).json(forumId)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const updateForum = async (req: Request, res: Response): Promise<void> => {
    try {
        const forum = await Forum.findById(req.params.forumId)

        if (!forum) res.status(400).json({
            code: 400,
            message: 'Forum não encontrado'
        })

        const updateForum = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            message: req.body.message
        }

        await Forum.findByIdAndUpdate(forum, {
            $set: updateForum
        }, { new: true })

        res.status(200).json(updateForum)

    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const deleteForum = async (req: Request, res: Response): Promise<void> => {
    try {
        const forumId = await Forum.findByIdAndRemove(req.params.forumId)

        if (!forumId) res.status(400).json({
            code: 400,
            message: 'Não foi possível excluir o assunto'
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