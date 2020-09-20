"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var auth_controller_1 = require("../controllers/auth.controller");
exports.AuthRoutes = function (routes) {
    // auth
    routes.post('/auth/signin', auth_controller_1.signin);
};
/**
 * {
 *      "email": "email",
 *      "password": "senha"
 * }
 *
 */ 
