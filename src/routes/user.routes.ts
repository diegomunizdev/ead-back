import { Router } from 'express';

import { TokenValidation, TokenValidationAdmin, TokenValidationTeacher } from '../middlewares/token.validation';
import { createUser, getByUserId, getByType, getAll, updateUser, deleteUser } from '../controllers/user.controller'

const url_user = '/user/:userId'

// user
export const UserRoutes = (routes: Router) => {
        routes.post('/user', TokenValidationAdmin, createUser)
                .get('/users', TokenValidationAdmin, getAll)
                .get('/user/type/:usertype', TokenValidationTeacher, getByType)
                .get(`${url_user}/profile`, TokenValidation, getByUserId)
                .patch(`${url_user}/update`, TokenValidationAdmin, updateUser)
                .delete(`${url_user}/delete`, TokenValidationAdmin, deleteUser)
}
