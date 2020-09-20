import { Router } from 'express';

// TODO: Adicionar o token na rota posteriormente
import { TokenValidation, TokenValidationAdmin, TokenValidationTeacher } from '../middlewares/token.validation';
import { createUser, getByUserId, getByType, getAll, updateUser, deleteUser } from '../controllers/user.controller'
import { UploadFile } from '../middlewares/upload.files';

const url_user = '/user/:userId'

// user
export const UserRoutes = (routes: Router) => {
        routes.post('/user', TokenValidationAdmin, UploadFile.single('avatar'), createUser)
                // /users?page=1&limit=10
                .get('/users', TokenValidationAdmin, getAll)
                // /user/type/:usertype?page=1&limit=10 - troque o :usertype por admin, teacher, student ou tutor 
                .get('/user/type/:usertype', TokenValidationTeacher, getByType)
                // dê um getAll, e no resultado pegue o id de qualquer usuário e coloque no lugar no :userId
                .get(`${url_user}/profile`, TokenValidation, getByUserId)
                .patch(`${url_user}/update`, TokenValidationAdmin, UploadFile.single('avatar'), updateUser)
                .delete(`${url_user}/delete`, TokenValidationAdmin, deleteUser)
}

/**
 * ### POST - tipo admin, teacher ou tutor
 * {
 *      "name": "nome",
 *      "email": "email",
 *      "password": "senha",
 *      "type": "admin, teacher ou tutor"
 * }
 *
 * ### POST - tipo student
 * {
 *      "name": "nome",
 *      "email": "email",
 *      "password": "senha",
 *      "type": "student",
 *      "period": 0 - valor de 0 a 10, tipo number
 *      "gamePoints": 0  - valor de 0 a 100, tipo number
 *      "notes": [] - Pode deixar as notas em brancos
 * }
 *
 */