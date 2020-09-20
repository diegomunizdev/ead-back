"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteForum = exports.updateForum = exports.forumById = exports.getAll = exports.createForum = void 0;
var forum_model_1 = __importDefault(require("../models/forum.model"));
var pagination_shared_1 = require("../shared/pagination.shared");
exports.createForum = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var forum, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                forum = new forum_model_1.default(req.body);
                if (!forum)
                    res.status(401).json({
                        code: 401,
                        message: 'Não foi possível criar o assunto no fórum',
                        description: ''
                    });
                return [4 /*yield*/, forum.save()];
            case 1:
                _a.sent();
                res.status(201).json(forum);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).json({
                    code: 400,
                    message: error_1.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = pagination_shared_1.PaginationData(forum_model_1.default);
exports.forumById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var forumId, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, forum_model_1.default.findById(req.params.forumId)];
            case 1:
                forumId = _a.sent();
                if (!forumId)
                    res.status(400).json({
                        code: 400,
                        message: 'Não foi possível recuperar os dados'
                    });
                res.status(200).json(forumId);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).json({
                    code: 400,
                    message: error_2.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateForum = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var forum, updateForum_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, forum_model_1.default.findById(req.params.forumId)];
            case 1:
                forum = _a.sent();
                if (!forum)
                    res.status(400).json({
                        code: 400,
                        message: 'Forum não encontrado'
                    });
                updateForum_1 = {
                    title: req.body.title,
                    subtitle: req.body.subtitle,
                    message: req.body.message
                };
                return [4 /*yield*/, forum_model_1.default.findByIdAndUpdate(forum, {
                        $set: updateForum_1
                    }, { new: true })];
            case 2:
                _a.sent();
                res.status(200).json(updateForum_1);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(400).json({
                    code: 400,
                    message: error_3.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteForum = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var forumId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, forum_model_1.default.findByIdAndRemove(req.params.forumId)];
            case 1:
                forumId = _a.sent();
                if (!forumId)
                    res.status(400).json({
                        code: 400,
                        message: 'Não foi possível excluir o assunto'
                    });
                res.status(200).json({
                    code: 200,
                    message: 'Excluído com sucesso'
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).json({
                    code: 400,
                    message: error_4.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
