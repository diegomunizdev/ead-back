"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidationTutor = exports.TokenValidationStudent = exports.TokenValidationTeacher = exports.TokenValidationAdmin = exports.TokenValidation = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = require("../models/user.model");
// Rota com validação de todos os usuários
exports.TokenValidation = function (req, res, next) {
    try {
        var token = req.header('Authorization');
        if (!token)
            res.status(401).json({
                auth: false,
                code: 401,
                message: 'Token não encontrado'
            });
        var token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
        jsonwebtoken_1.default.verify(token ? token : '', token_secret);
        next();
    }
    catch (error) {
    }
};
// Rota apenas para usuários do tipo Admin
exports.TokenValidationAdmin = function (req, res, next) {
    try {
        var token = req.header('Authorization');
        if (!token)
            res.status(401).json({
                auth: false,
                code: 401,
                message: 'Token não encontrado'
            });
        var decode = jsonwebtoken_1.default.decode(token ? token : '');
        var token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
        if (decode.type === user_model_1.UserType.ADMIN) {
            jsonwebtoken_1.default.verify(token ? token : '', token_secret);
        }
        else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            });
        }
        next();
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        });
    }
};
// Rotas para os usuários dos tipo admin e teacher
exports.TokenValidationTeacher = function (req, res, next) {
    try {
        var token = req.header('Authorization');
        if (!token)
            res.status(401).json({
                auth: false,
                code: 401,
                message: 'Token não encontrado'
            });
        var decode = jsonwebtoken_1.default.decode(token ? token : '');
        var token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
        if (decode.type === user_model_1.UserType.ADMIN || user_model_1.UserType.TEACHER) {
            jsonwebtoken_1.default.verify(token ? token : '', token_secret);
        }
        else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            });
        }
        next();
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        });
    }
};
exports.TokenValidationStudent = function (req, res, next) {
    try {
        var token = req.header('Authorization');
        if (!token)
            res.status(401).json({
                auth: false,
                code: 401,
                message: 'Token não encontrado'
            });
        var decode = jsonwebtoken_1.default.decode(token ? token : '');
        var token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
        if (decode.type === user_model_1.UserType.ADMIN || user_model_1.UserType.STUDENT) {
            jsonwebtoken_1.default.verify(token ? token : '', token_secret);
        }
        else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            });
        }
        next();
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        });
    }
};
// Rotas para os usuários do tipo admin ou tutor
exports.TokenValidationTutor = function (req, res, next) {
    try {
        var token = req.header('Authorization');
        if (!token)
            res.status(401).json({
                auth: false,
                code: 401,
                message: 'Token não fornecido'
            });
        var decode = jsonwebtoken_1.default.decode(token ? token : '');
        var token_secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : '';
        if (decode.type === user_model_1.UserType.ADMIN || user_model_1.UserType.TUTOR) {
            jsonwebtoken_1.default.verify(token ? token : '', token_secret);
        }
        else {
            return res.status(401).json({
                message: 'Acesso Negado. Você não tem permissão para acessar está rota!'
            });
        }
        next();
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            error: error.message
        });
    }
};
