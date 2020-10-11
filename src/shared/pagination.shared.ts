import { Request, Response } from 'express'
import { UserType } from '../models/schemas/user.model'

export const PaginationData = (model: any) => {
    return async (req: Request, res: Response) => {
        const page = parseInt(String(req.query.page), 10)
        const limit = parseInt(String(req.query.limit), 10)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = {
            "total": await model.countDocuments().exec(),
            "previous": {},
            "next": {},
            "data": []
        }

        try {
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            if (endIndex < await model.countDocuments().exec()) {
                result.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            result.data = await model.find()
                .limit(limit)
                .skip(startIndex)
                .exec()

            // Se o modelo for do tipo usuário a senha não será mostrada no frontend
            result.data.map((dt: any) => dt.password = undefined)

            if (!result.data) res.status(400).json({
                code: 400,
                message: 'Usuários não encontrados',
                description: ''
            })
            res.header('X-Total-Count', result.total)
            res.json(result)
        } catch (error) {
            res.status(400).json({
                code: 400,
                error: error.message
            })
        }
    }
}

export const PaginationDataPeriod = (model: any) => {
    return async (req: Request, res: Response) => {
        const page = parseInt(String(req.query.page), 10)
        const limit = parseInt(String(req.query.limit), 10)
        const period = parseInt(String(req.params.period), 10)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = {
            "total": await model.countDocuments({ period: period }).exec(),
            "previous": {},
            "next": {},
            "data": []
        }

        try {
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            if (endIndex < await model.countDocuments({ period: period }).exec()) {
                result.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            result.data = await model.find({ period: period })
                .limit(limit)
                .skip(startIndex)
                .exec()

            if (!result.data) res.status(400).json({
                code: 400,
                message: 'Dados não encontrados',
                description: ''
            })

            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({
                code: 400,
                error: error.message
            })
        }
    }
}

export const PaginationDataType = (model: any) => {
    return async (req: Request, res: Response) => {
        let page: number = 0
        let limit: number = 0
        let type: string = ''
        if (req.params.usertype && req.query.page && req.query.limit) {
            page = parseInt(String(req.query.page), 10)
            limit = parseInt(String(req.query.limit), 10)
            type = req.params.usertype
        } else {
            res.json({
                message: 'Parâmetros não encontrados'
            })
        }

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = {
            "total": await model.countDocuments({ type: type }).exec(),
            "previous": {},
            "next": {},
            "data": []
        }
        try {
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            if (endIndex < await model.countDocuments({ type: type }).exec()) {
                result.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (UserType.ADMIN === type) {
                result.data = await model.find({ type: UserType.ADMIN })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            } else if (UserType.TEACHER === type) {
                result.data = await model.find({ type: UserType.TEACHER })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            } else if (UserType.STUDENT === type) {
                result.data = await model.find({ type: UserType.STUDENT })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            } else if (UserType.TUTOR === type) {
                result.data = await model.find({ type: UserType.TUTOR })
                    .limit(limit)
                    .skip(startIndex)
                    .exec()
            }

            if (!result) res.status(400).json({
                code: 400,
                message: 'Usuários não encontrados',
                description: ''
            })

            result.data.map((dt: any) => dt.password = undefined)
            res.header('X-Total-Count', result.total)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({
                code: 400,
                error: error.message
            })
        }
    }
}