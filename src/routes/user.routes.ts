import { Router } from 'express';

import { TokenValidation } from '../middlewares/token.validation';
import { createUser, getByUserId, getByType, getAll, updateUser, deleteUser } from '../controllers/user.controller'

const url_user = '/user/:userId'

// user
export const UserRoutes = (routes: Router) => {
    routes.post('/user', createUser)
        .get('/users', TokenValidation, getAll)
        .get('/user/:usertype', TokenValidation, getByType)
        .get(`${url_user}/profile`, getByUserId)
        .patch(`${url_user}`, TokenValidation, updateUser)
        .delete(`${url_user}`, TokenValidation, deleteUser)
}