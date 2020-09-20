"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var database = process.env.CONNECTION_DB ? process.env.CONNECTION_DB : '';
var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
mongoose_1.default.connect(database, options).then(function (result) {
    console.log('>>> Banco de Dados conectado com sucesso');
}).catch(function (err) {
    console.log('xxx Não foi possível conectar com o Banco de Dados. Error: ', err.message);
});
