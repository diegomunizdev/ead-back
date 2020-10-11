import { Router } from 'express'
import { signin } from '../controllers/auth.controller'

export const AuthRoutes = (routes: Router) => {
    routes.post('/auth/signin', signin)
}
