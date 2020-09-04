import { Request, Response } from 'express'
import { UserType } from '../models/user.model'

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

            result.data.map((dt: any) => dt.password = undefined)

            if (!result.data) res.status(400).json({
                code: 400,
                message: 'Usuários não encontrados',
                description: ''
            })

            res.status(200).json({
                code: 200,
                data: result
            })
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
            res.status(200).json({
                code: 200,
                result
            })
        } catch (error) {
            res.status(400).json({
                code: 400,
                error: error.message
            })
        }
    }
}