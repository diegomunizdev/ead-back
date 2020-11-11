import express, { Application, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
const app: Application = express();

import Routes from './routes/routes'

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use('/ead/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count")
    app.use(cors())
    next()
})

// routes
app.use('/ead', Routes)

// TODO: Rota para url's não encontradas ou inexistentes 
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        code: 404,
        message: 'Página não encontrada!'
    })
    next()
})

export default app