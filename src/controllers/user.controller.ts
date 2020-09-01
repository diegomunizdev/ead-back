import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import bcrypt from 'bcrypt'

// TODO: Verificar os códigos HTTP

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser = new User(req.body)

        if (!user) res.status(401).json({
            code: 401,
            message: 'Não foi possível criar o usuário',
            description: ''
        })

        user.password = await user.encryptPassword(user.password ? user.password : '')

        await user.save()

        // TODO: no retorno da resposta a senha não é mostrada
        user.password = undefined
        res.status(201).json({
            code: 201,
            message: 'Usuário criado com sucesso',
            data: user
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
        const users = await User.find()
        if (!users) res.status(400).json({
            code: 400,
            message: 'Usuários não encontrados',
            description: 'Não foi possível retornar os usuários'
        })

        res.status(200).json({
            code: 200,
            data: users
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) res.status(400).json({
            code: 400,
            message: 'Usuário não foi encontrado',
            description: ''
        })
        user ? user.password = undefined : ''
        res.status(200).json({
            code: 200,
            message: 'Usuário atualizado com sucesso',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) res.status(400).json({
            code: 400,
            message: 'Usuário não encontrado',
            description: 'Não foi possível deletar o usuário'
        })
        const updateUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt)
            }
        }

        updateUser.password = await updateUser.encryptPassword(updateUser.password ? updateUser.password : '')

        await User.findByIdAndUpdate(user, {
            $set: updateUser
        }, { new: true })

        updateUser.password = undefined

        res.status(200).json({
            code: 200,
            message: 'Usuário atualizado com sucesso',
            description: ''
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId)

        if (!user) res.status(400).json({
            code: 400,
            message: 'Usuário não encontrado',
            description: 'Não foi possível deletar o usuário'
        })

        res.status(200).json({
            code: 200,
            message: 'Usuário removido com sucesso',
            description: ''
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}