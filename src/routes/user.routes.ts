import { Router } from 'express';

import { TokenValidation, TokenValidationAdmin, TokenValidationTeacher } from '../middlewares/token.validation';
import { createUser, getByUserId, getByType, getAll, updateUser, deleteUser } from '../controllers/user.controller'

import UserService from '../controllers/service/User'

const url_user = '/user/:userId'

export class UserRoute {
        constructor(private readonly userService: UserService) { }

        public userRoutes(routes: Router): Promise<Router> {
                return Promise.resolve(routes.post('/user', this.userService.create))
        }
}

// user
export const UserRoutes = (routes: Router) => {
        routes.post('/user', createUser)
                .get('/users', TokenValidationAdmin, getAll)
                .get('/user/type/:usertype', TokenValidationTeacher, getByType)
                .get(`${url_user}/profile`, TokenValidation, getByUserId)
                .patch(`${url_user}/update`, updateUser)
                .delete(`${url_user}/delete`, TokenValidationAdmin, deleteUser)


}
