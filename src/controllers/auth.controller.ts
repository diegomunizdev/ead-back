import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

// TODO: Verificar o status HTTP

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select('+password');

        if (!user) res.status(400).json({
            code: 400,
            message: 'Email ou senha inválido',
            description: ''
        })

        const correctPassword: boolean = await (user ? user.validatePassword(req.body.password) : false)
        if (!correctPassword) res.status(400).json({
            code: 400,
            message: 'Senha inválida',
            description: ''
        })

        const token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''

        const token: string = jwt.sign({ id: user ? user._id : '', type: user ? user.type : '' }, token_secret, {
            expiresIn: '7d'
        })

        if (!token) res.status(400).json({
            code: 400,
            message: 'Token não fornecido'
        })

        user ? user.password = undefined : ''
        // TODO: conferir se é necessário retornar o .json({ status: 200, Authorization: token })
        // PARA MELHOR TESTAR POR ENQUANTO ESTÁ ENVIANDO O JSON DESSA FORMA
        res.header('Authorization', token).json({ status: 200, Authorization: token })
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}