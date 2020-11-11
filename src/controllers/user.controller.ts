import { Request, Response } from 'express'
import User, { IUser } from '../models/schemas/user.model'
import { PaginationData, PaginationDataType } from '../shared/pagination.shared'
import bcrypt from 'bcrypt'
import { ValidateUser } from '../models/validators/user.validators'

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser = new User(req.body)

        if (!user) res.status(401).json({
            code: 401,
            message: 'Não foi possível criar o usuário',
            description: ''
        })
        // Em caso de erro entra no catch e envia um mensagem de error
        await ValidateUser.validate(user)
        user.password = await user.encryptPassword(user.password ? user.password : '')
        await user.save()
        user.password = undefined
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({
            code: 400,
            message: error.message
        })
    }
}

export const getByType = PaginationDataType(User)
export const getAll = PaginationData(User)

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.params.userId })
        if (!user) res.status(400).json({
            code: 400,
            message: 'Usuário não foi encontrado',
            description: ''
        })
        user ? user.password = undefined : ''
        res.status(200).json(user)
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

        // TODO: Configurar modo de atualizar senha...
        const updateUser = {
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            type: req.body.type,
            period: req.body.period,
            gamePoints: req.body.gamePoints,
            noteOne: req.body.noteOne,
            noteTwo: req.body.noteTwo,
            noteThree: req.body.noteThree,
            noteFour: req.body.noteFour,
            encryptPassword: async (password: string): Promise<string> => {
                password = req.body.password
                const salt = await bcrypt.genSalt(10);
                return bcrypt.hash(password, salt)
            }
        }

        // updateUser.password = await updateUser.encryptPassword(updateUser.password ? updateUser.password : '')

        await User.findByIdAndUpdate(user, {
            $set: updateUser
        }, { new: true })

        // updateUser.password = undefined

        res.status(200).json(updateUser)
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