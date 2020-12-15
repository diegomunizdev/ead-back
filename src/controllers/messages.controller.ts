import { Request, Response } from 'express'
import Messages, { IMessage } from '../models/schemas/messages.model'

export const addMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const message: IMessage = new Messages(req.body)
        if (!message) res.status(401).json({
            code: 401,
            message: 'Não foi possível enviar a mensagem',
            description: ''
        })

        await message.save()

        res.status(201).json(message)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const messages = await Messages.find({ forumId: req.params.forumId })
        if (!messages) res.status(401).json({
            code: 401,
            message: 'Não foi possível recuperar todas as mensagens',
            description: ''
        })

        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const message = await Messages.findByIdAndRemove(req.params.messageId)

        if (!message) res.status(400).json({
            code: 400,
            message: 'Não foi possível excluir a mensagem'
        })

        res.status(200).json({
            code: 200,
            message: 'Excluído com sucesso!'
        })
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: error.message
        })
    }
}