import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/schemas/user.model';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
    type: UserType;
}

// Rota com validação de todos os usuários
export const TokenValidation = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'Token não encontrado'
        })

        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        jwt.verify(token ? token : '', token_secret) as IPayload

        next()
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

// Rota apenas para usuários do tipo Admin
export const TokenValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'Token não encontrado'
        })
        const decode: any = jwt.decode(token ? token : '')
        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        if (decode.type === UserType.ADMIN) {
            jwt.verify(token ? token : '', token_secret) as IPayload
        } else {
            return res.status(401).json({
                code: 401,
                message: 'Acesso Negado! Você não tem permissão para acessar está rota!'
            })
        }
        next()
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

// Rotas para os usuários dos tipo admin e teacher
export const TokenValidationTeacher = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'Token não encontrado'
        })
        const decode: any = jwt.decode(token ? token : '')
        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        if (decode.type === UserType.ADMIN || UserType.TEACHER) {
            jwt.verify(token ? token : '', token_secret) as IPayload
        } else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            })
        }
        next()
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

export const TokenValidationStudent = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'Token não encontrado'
        })
        const decode: any = jwt.decode(token ? token : '')
        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        if (decode.type === UserType.ADMIN || UserType.STUDENT) {
            jwt.verify(token ? token : '', token_secret) as IPayload
        } else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            })
        }
        next()
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}

// Rotas para os usuários do tipo admin ou tutor
export const TokenValidationTutor = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'O token de autorização não foi fornecido'
        })
        const decode: any = jwt.decode(token ? token : '')
        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        if (decode.type === UserType.ADMIN || UserType.TUTOR) {
            jwt.verify(token ? token : '', token_secret) as IPayload
        } else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            })
        }
        next()
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}
