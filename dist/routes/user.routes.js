"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
// TODO: Adicionar o token na rota posteriormente
var token_validation_1 = require("../middlewares/token.validation");
var user_controller_1 = require("../controllers/user.controller");
var upload_files_1 = require("../middlewares/upload.files");
var url_user = '/user/:userId';
// user
exports.UserRoutes = function (routes) {
    routes.post('/user', token_validation_1.TokenValidationAdmin, upload_files_1.UploadFile.single('avatar'), user_controller_1.createUser)
        // /users?page=1&limit=10
        .get('/users', token_validation_1.TokenValidationAdmin, user_controller_1.getAll)
        // /user/type/:usertype?page=1&limit=10 - troque o :usertype por admin, teacher, student ou tutor 
        .get('/user/type/:usertype', token_validation_1.TokenValidationTeacher, user_controller_1.getByType)
        // dê um getAll, e no resultado pegue o id de qualquer usuário e coloque no lugar no :userId
        .get(url_user + "/profile", token_validation_1.TokenValidation, user_controller_1.getByUserId)
        .patch(url_user + "/update", token_validation_1.TokenValidationAdmin, upload_files_1.UploadFile.single('avatar'), user_controller_1.updateUser)
        .delete(url_user + "/delete", token_validation_1.TokenValidationAdmin, user_controller_1.deleteUser);
};
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
