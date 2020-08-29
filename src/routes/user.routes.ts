import { Router } from 'express';

import { TokenValidation } from '../middlewares/token.validation';
import { createUser, getByUserId, getAll, updateUser, deleteUser } from '../controllers/user.controller'

const url_user = '/user/:userId'

// user
export const UserRoutes = (routes: Router) => {
    routes.post('/user', createUser)
        .get('/users', TokenValidation, getAll)
        .get(`${url_user}`, TokenValidation, getByUserId)
        .patch(`${url_user}`, TokenValidation, updateUser)
        .delete(`${url_user}`, TokenValidation, deleteUser)
}