import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/user.model';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
    type: UserType;
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.header('Authorization')

        if (!token) res.status(401).json({
            auth: false,
            code: 401,
            message: 'Token não encontrado'
        })

        const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ''
        jwt.verify(token ? token : '', token_secret || 'tokensecret') as IPayload

        next()
    } catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        })
    }
}
