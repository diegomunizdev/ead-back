"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./database");
var port = process.env.HTTP_PORT ? process.env.HTTP_PORT : '';
function main() {
    app_1.default.listen(process.env.PORT || port);
    console.log(">> Servidor rodando http://localhost:" + port);
}
main();
