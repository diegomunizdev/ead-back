import { Response } from 'express'

export const HttpUnauthorized = (res: Response) => {
    return res.status(401).json({
        code: 401,
        message: 'Você precisa estar autenticado!'
    })
}

export const HttpForbindden = (res: Response) => {
    return res.status(403).json({
        code: 403,
        message: 'vocẽ não tem permissão para acessar essa rota!'
    })
}