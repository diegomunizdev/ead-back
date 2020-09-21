"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var now = new Date();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
exports.UploadFile = multer_1.default({ storage: storage });
