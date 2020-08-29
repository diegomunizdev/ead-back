import { Router } from 'express';
import { signin } from '../controllers/auth.controller';

export const AuthRoutes = (routes: Router) => {
    // auth
    routes.post('/auth/signin', signin)
}