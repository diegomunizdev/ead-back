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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDataType = exports.PaginationDataGame = exports.PaginationData = void 0;
var user_model_1 = require("../models/user.model");
exports.PaginationData = function (model) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, startIndex, endIndex, result, _a, _b, _c, error_1;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    page = parseInt(String(req.query.page), 10);
                    limit = parseInt(String(req.query.limit), 10);
                    startIndex = (page - 1) * limit;
                    endIndex = page * limit;
                    _d = {};
                    _a = "total";
                    return [4 /*yield*/, model.countDocuments().exec()];
                case 1:
                    result = (_d[_a] = _e.sent(),
                        _d["previous"] = {},
                        _d["next"] = {},
                        _d["data"] = [],
                        _d);
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 5, , 6]);
                    if (startIndex > 0) {
                        result.previous = {
                            page: page - 1,
                            limit: limit
                        };
                    }
                    _b = endIndex;
                    return [4 /*yield*/, model.countDocuments().exec()];
                case 3:
                    if (_b < (_e.sent())) {
                        result.next = {
                            page: page + 1,
                            limit: limit
                        };
                    }
                    _c = result;
                    return [4 /*yield*/, model.find()
                            .limit(limit)
                            .skip(startIndex)
                            .exec()
                        // Se o modelo for do tipo usuário a senha não será mostrada no frontend
                    ];
                case 4:
                    _c.data = _e.sent();
                    // Se o modelo for do tipo usuário a senha não será mostrada no frontend
                    result.data.map(function (dt) { return dt.password = undefined; });
                    if (!result.data)
                        res.status(400).json({
                            code: 400,
                            message: 'Usuários não encontrados',
                            description: ''
                        });
                    res.header('X-Total-Count', result.total);
                    res.json(result);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _e.sent();
                    res.status(400).json({
                        code: 400,
                        error: error_1.message
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
exports.PaginationDataGame = function (model) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, period, startIndex, endIndex, result, _a, _b, _c, error_2;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    page = parseInt(String(req.query.page), 10);
                    limit = parseInt(String(req.query.limit), 10);
                    period = parseInt(String(req.params.period), 10);
                    startIndex = (page - 1) * limit;
                    endIndex = page * limit;
                    _d = {};
                    _a = "total";
                    return [4 /*yield*/, model.countDocuments({ period: period }).exec()];
                case 1:
                    result = (_d[_a] = _e.sent(),
                        _d["previous"] = {},
                        _d["next"] = {},
                        _d["data"] = [],
                        _d);
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 5, , 6]);
                    if (startIndex > 0) {
                        result.previous = {
                            page: page - 1,
                            limit: limit
                        };
                    }
                    _b = endIndex;
                    return [4 /*yield*/, model.countDocuments({ period: period }).exec()];
                case 3:
                    if (_b < (_e.sent())) {
                        result.next = {
                            page: page + 1,
                            limit: limit
                        };
                    }
                    _c = result;
                    return [4 /*yield*/, model.find({ period: period })
                            .limit(limit)
                            .skip(startIndex)
                            .exec()];
                case 4:
                    _c.data = _e.sent();
                    if (!result.data)
                        res.status(400).json({
                            code: 400,
                            message: 'Pergunta não encontrada',
                            description: ''
                        });
                    res.status(200).json(result);
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _e.sent();
                    res.status(400).json({
                        code: 400,
                        error: error_2.message
                    });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
exports.PaginationDataType = function (model) {
    return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, type, startIndex, endIndex, result, _a, _b, _c, _d, _e, _f, error_3;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    page = 0;
                    limit = 0;
                    type = '';
                    if (req.params.usertype && req.query.page && req.query.limit) {
                        page = parseInt(String(req.query.page), 10);
                        limit = parseInt(String(req.query.limit), 10);
                        type = req.params.usertype;
                    }
                    else {
                        res.json({
                            message: 'Parâmetros não encontrados'
                        });
                    }
                    startIndex = (page - 1) * limit;
                    endIndex = page * limit;
                    _g = {};
                    _a = "total";
                    return [4 /*yield*/, model.countDocuments({ type: type }).exec()];
                case 1:
                    result = (_g[_a] = _h.sent(),
                        _g["previous"] = {},
                        _g["next"] = {},
                        _g["data"] = [],
                        _g);
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 12, , 13]);
                    if (startIndex > 0) {
                        result.previous = {
                            page: page - 1,
                            limit: limit
                        };
                    }
                    _b = endIndex;
                    return [4 /*yield*/, model.countDocuments({ type: type }).exec()];
                case 3:
                    if (_b < (_h.sent())) {
                        result.next = {
                            page: page + 1,
                            limit: limit
                        };
                    }
                    if (!(user_model_1.UserType.ADMIN === type)) return [3 /*break*/, 5];
                    _c = result;
                    return [4 /*yield*/, model.find({ type: user_model_1.UserType.ADMIN })
                            .limit(limit)
                            .skip(startIndex)
                            .exec()];
                case 4:
                    _c.data = _h.sent();
                    return [3 /*break*/, 11];
                case 5:
                    if (!(user_model_1.UserType.TEACHER === type)) return [3 /*break*/, 7];
                    _d = result;
                    return [4 /*yield*/, model.find({ type: user_model_1.UserType.TEACHER })
                            .limit(limit)
                            .skip(startIndex)
                            .exec()];
                case 6:
                    _d.data = _h.sent();
                    return [3 /*break*/, 11];
                case 7:
                    if (!(user_model_1.UserType.STUDENT === type)) return [3 /*break*/, 9];
                    _e = result;
                    return [4 /*yield*/, model.find({ type: user_model_1.UserType.STUDENT })
                            .limit(limit)
                            .skip(startIndex)
                            .exec()];
                case 8:
                    _e.data = _h.sent();
                    return [3 /*break*/, 11];
                case 9:
                    if (!(user_model_1.UserType.TUTOR === type)) return [3 /*break*/, 11];
                    _f = result;
                    return [4 /*yield*/, model.find({ type: user_model_1.UserType.TUTOR })
                            .limit(limit)
                            .skip(startIndex)
                            .exec()];
                case 10:
                    _f.data = _h.sent();
                    _h.label = 11;
                case 11:
                    if (!result)
                        res.status(400).json({
                            code: 400,
                            message: 'Usuários não encontrados',
                            description: ''
                        });
                    result.data.map(function (dt) { return dt.password = undefined; });
                    res.status(200).json(result);
                    return [3 /*break*/, 13];
                case 12:
                    error_3 = _h.sent();
                    res.status(400).json({
                        code: 400,
                        error: error_3.message
                    });
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
};
