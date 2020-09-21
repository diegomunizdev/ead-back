"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var routes_1 = __importDefault(require("./routes/routes"));
// middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use('/ead/files', express_1.default.static(path_1.default.resolve(__dirname, 'src', 'uploads')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PATCH,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
    app.use(cors_1.default());
    next();
});
// routes
app.use('/ead', routes_1.default);
exports.default = app;
